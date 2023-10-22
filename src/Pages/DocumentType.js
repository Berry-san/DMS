import forward from '../assets/svgs/forward.svg'
import trash from '../assets/svgs/trash.svg'
import back from '../assets/svgs/back.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination/Pagination'
import axios from 'axios'
import { API_BASE } from '../middleware/API_BASE'
import ShareButton from '../components/ShareButton/ShareButton'
import Modal from '../components/Modal/Modal'

const DocumentType = () => {
  const { documentId } = useParams()
  const decodedID = String(atob(documentId), 10)

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState([])
  const [sortOrder, setSortOrder] = useState('asc')
  const [filteredData, setFilteredData] = useState([])
  const [tableHeader, setTableHeader] = useState()
  const [showModal, setShowModal] = useState(false)
  const [fileToDelete, setFileToDelete] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser)

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }

    axios
      .get(
        API_BASE + `get_document_details_by_id?document_id=${decodedID}`,
        config
      )
      .then((res) => {
        const apiData = res.data.result
        const dataWithId = apiData.map((item, index) => ({
          ...item,
          id: index + 1,
        }))
        setFilteredData(dataWithId)
        setSortedData(dataWithId)
        if (apiData.length > 0) setTableHeader(apiData[0].document_type)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [decodedID])

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
    const filtered = sortedData.filter((item) =>
      // item.firstName.toLowerCase().includes(searchValue) ||
      item.document_owner.toLowerCase().includes(searchValue)
    )
    setFilteredData(filtered)
  }

  const handleSortByDate = () => {
    // Use the current sorting order to determine the new order
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'

    const sorted = [...filteredData].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return new Date(a.uploaded_dt) - new Date(b.uploaded_dt)
      } else {
        return new Date(b.uploaded_dt) - new Date(a.uploaded_dt)
      }
    })

    setFilteredData(sorted)
    setSortOrder(newSortOrder)
  }

  const openDeleteModal = (docID) => {
    setFileToDelete(docID)
    setShowModal(true)
  }

  const closeDeleteModal = () => {
    setShowModal(false)
    setFileToDelete(null)
  }

  const handleDelete = (docID) => {
    // Make the API call to delete the file with docID
    // After successful deletion, update the UI to reflect the deletion
    const updatedData = filteredData.filter((doc) => doc.id !== docID)
    setFilteredData(updatedData)

    // Close the modal after deletion
    closeDeleteModal()
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-5">
          <img
            src={back}
            className="w-6 h-6 cursor-pointer"
            alt=""
            onClick={goBack}
          />
          <h3 className="flex text-lg font-bold text-left">{tableHeader}</h3>
        </div>

        <div className="items-center hidden space-x-10 md:flex w-72">
          {/* <Search placeholder="Search..." /> */}
          <div className="rounded w-full border-b border-[#4ECCA3] px-5 py-2 text-gray-500 focus-within:text-gray-500 bg-[#f4f4f4] focus:outline-none focus:bg-[#f4f4f4] ">
            <input
              type="search"
              name="search"
              className="w-full text-sm focus:outline-none bg-[#f4f4f4]"
              autoComplete="off"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="border rounded border-border_color">
          <table className="w-full table-auto">
            <thead className="text-sm font-bold bg-green">
              <tr className="text-left bg-green">
                <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4 xl:pl-11">
                  Owner
                </th>

                <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4">
                  Document Name
                </th>

                <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4">
                  Purpose
                </th>
                <th
                  className="px-2 py-2 font-medium text-black cursor-pointer md:py-4 md:px-4"
                  onClick={handleSortByDate}
                >
                  Date {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
                <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium leading-5">
              {currentUsers?.map((owner) => {
                const link = `https://connectapi.mosquepay.org/cmd_system_api/assets/img/useraccount/${owner.image}`
                return (
                  <tr key={owner.id}>
                    <td className="p-4 border-b border-border_color xl:pl-11">
                      <p className="font-medium text-black">
                        {owner.document_owner}
                      </p>
                    </td>
                    <td className="p-4 border-b border-border_color dark:border-strokedark">
                      <p className="text-black truncate max-w-[10rem]">
                        {owner.image}
                      </p>
                    </td>
                    <td className="p-4 border-b border-border_color dark:border-strokedark">
                      <p className="text-black truncate max-w-[10rem]">
                        {owner.purpose}
                      </p>
                    </td>
                    <td className="p-4 border-b border-border_color dark:border-strokedark">
                      <p className="text-black">{owner.uploaded_dt}</p>
                    </td>
                    <td className="z-30 flex items-center p-4 space-x-4 border-b border-border_color dark:border-strokedark">
                      <ShareButton
                        link={link}
                        icon={forward}
                        // handleDelete={}
                      />
                      <span
                        className="cursor-pointer"
                        onClick={() => openDeleteModal(owner.id)}
                      >
                        <img src={trash} alt="" />
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end">
          <Pagination
            currentPage={currentPage}
            onPageChange={paginate}
            totalCount={filteredData.length}
            pageSize={usersPerPage}
            siblingCount={1}
            className="my-3"
          />
        </div>

        <Modal isVisible={showModal} onClose={closeDeleteModal}>
          <h2 className="mb-5 font-semibold text-center">
            Are you sure you want to delete this file?
          </h2>
          <div className="flex justify-center space-x-2">
            <button
              className="px-4 py-2 text-white rounded bg-rose-600"
              onClick={() => handleDelete(fileToDelete)}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded"
              onClick={closeDeleteModal}
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default DocumentType
