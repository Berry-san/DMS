import forward from '../assets/svgs/forward.svg'
import ellipsis from '../assets/svgs/ellipsis.svg'
import trash from '../assets/svgs/trash.svg'
import back from '../assets/svgs/back.svg'
import audit from '../assets/svgs/audit.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Pagination from '../components/Pagination/Pagination'
import axios from 'axios'
import qs from 'qs'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_BASE } from '../middleware/API_BASE'
import ShareButton from '../components/ShareButton/ShareButton'
import Modal from '../components/Modal/Modal'
import UserAction from '../components/UserAction/UserAction'
import { Link } from 'react-router-dom'
import Audit from '../components/Audit/Audit'

const DocumentType = () => {
  const { email, ref_id, role } = useSelector((state) => state.user.user)
  const { documentId } = useParams()
  const decoded = atob(documentId)
  const decodedID = decodeURIComponent(decoded)

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
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

  const openDeleteModal = (doc) => {
    setFileToDelete(doc)
    // console.log(doc.document_id)
    setShowModal(true)
  }

  const closeDeleteModal = () => {
    setShowModal(false)
    setFileToDelete(null)
  }

  const logAuditTrail = (action, url, email) => {
    // Create an audit trail entry
    const auditTrailEntry = {
      inserted_dt: new Date().toISOString(), // Current date and time
      ref_id,
      action,
      document_name: fileToDelete.image,
      email,
      url,
    }

    // Log the audit trail entry
    Audit.logAuditTrail(auditTrailEntry)
  }

  const handleDelete = async (file) => {
    console.log(file)
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }
    try {
      setLoading(true)
      // const response = await axios.post(
      //   API_BASE + 'deleteImage',
      //   qs.stringify(file.image),
      //   config
      // )
      const dataToDelete = {
        image: file.image,
      }

      const response = await axios.post(
        API_BASE + 'deleteImage',
        qs.stringify(dataToDelete), // Serialize the data object
        config
      )

      console.log(response)
      if (response.status === 200) {
        // After successful deletion, update the UI to reflect the deletion
        const updatedData = filteredData.filter((doc) => doc.id !== file.id)
        setFilteredData(updatedData)
        const link = `https://connectapi.mosquepay.org/cmd_system_api/assets/img/useraccount/${file.image}`
        logAuditTrail('Deleted Document', link, email)
        // Close the modal after deletion
        closeDeleteModal()
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
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
      {filteredData.length > 0 ? (
        <div>
          <div className="max-w-full overflow-x-auto bg-white border rounded-md border-stroke shadow-default">
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
                  const encodedValue = btoa(owner.image.toString())
                  return (
                    <tr key={owner.id} className="border-b border-border_color">
                      <td className="p-4 border-b border-border_color xl:pl-11">
                        <p className="font-medium text-black">
                          {owner.document_owner}
                        </p>
                      </td>
                      <td className="p-4 ">
                        <Link
                          to={`/layout/documents/${documentId}/${encodedValue}`}
                        >
                          <p className="text-black truncate max-w-[10rem]">
                            {owner.image}
                          </p>
                        </Link>
                      </td>
                      <td className="p-4 ">
                        <p className="text-black truncate max-w-[10rem]">
                          {owner.purpose}
                        </p>
                      </td>
                      <td className="p-4 ">
                        <p className="text-black">{owner.uploaded_dt}</p>
                      </td>
                      <td className="">
                        <div className="z-30 items-center hidden p-4 space-x-4 lg:flex">
                          <ShareButton
                            document_name={owner.image}
                            icon={forward}
                            // handleDelete={}
                          />
                          {role === '1' || '4 ' ? (
                            <Link
                              to={`/layout/documents/${documentId}/${encodedValue}`}
                            >
                              <img src={audit} alt="" />
                            </Link>
                          ) : null}
                          {/* <Link to={'/layout/document/audit'}>Hello</Link> */}
                          {role !== '3' ? (
                            <span
                              className="cursor-pointer"
                              onClick={() => openDeleteModal(owner)}
                            >
                              <img src={trash} alt="" />
                            </span>
                          ) : null}
                        </div>
                        <div className="flex items-center justify-center text-xl lg:hidden">
                          <UserAction
                            document_name={owner.image}
                            icon={ellipsis}
                            openDeleteModal={() => openDeleteModal(owner)}
                          />
                        </div>
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
                disabled={loading}
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
      ) : (
        <div className="flex items-center justify-center mt-40 sm:mt-60">
          <span className="font-semibold text-lg sm:text-[30px]">
            No Documents Available
          </span>
        </div>
      )}
    </>
  )
}

export default DocumentType
