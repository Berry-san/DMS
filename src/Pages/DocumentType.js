import eye from '../assets/svgs/eye.svg'
import forward from '../assets/svgs/forward.svg'
import trash from '../assets/svgs/trash.svg'
import Search from '../components/Search/Search'
import playGif from '../assets/svgs/play.gif'
import back from '../assets/svgs/back.svg'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination/Pagination'
import axios from 'axios'

const DocumentType = () => {
  const { documentId } = useParams()
  const decodedID = String(atob(documentId), 10)
  console.log(decodedID)
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState([])
  const [sortOrder, setSortOrder] = useState('asc')
  const [filteredData, setFilteredData] = useState([])
  const [tableHeader, setTableHeader] = useState()

  const [currentPage, setCurrentPage] = useState(1) // Track the current page
  const usersPerPage = 10

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser)
  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber)

  console.log(currentPage)
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': 987654,
      },
    }
    // Fetch data from your API endpoint
    axios
      .get(
        `http://161.35.56.41/cmd_system_api/v1/api/get_document_details_by_id?document_id=${decodedID}`,
        config
      )
      .then((res) => {
        const apiData = res.data.result
        const dataWithId = apiData.map((item, index) => ({
          ...item,
          id: index + 1, // You can use a more appropriate logic to generate IDs
        }))
        setFilteredData(dataWithId)
        setSortedData(dataWithId)
        if (apiData.length > 0) setTableHeader(apiData[0].document_type)
        console.log(dataWithId)
        // console.log(response.data)
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
    const sorted = [...filteredData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.birthDate) - new Date(b.birthDate)
      } else {
        return new Date(b.birthDate) - new Date(a.birthDate)
      }
    })

    setFilteredData(sorted)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
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
            {/* <span className=" inset-y-0 right-0 z-10 flex items-center mr-3">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span> */}
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
          <Link to="/uploadDocument">
            <img src={playGif} alt="" />
          </Link>
        </div>
      </div>
      <div>
        <div className="overflow-auto border rounded border-border_color">
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
                <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium leading-5">
              {currentUsers?.map((owner) => {
                // if (owner.document_id === decodedID) {
                //   setTitle(owner.document_type)
                // } else {
                //   setTitle('')
                // }
                console.log(owner.document_id === decodedID)
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
      </div>
    </>
  )
}

export default DocumentType
