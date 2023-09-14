import playGif from '../assets/svgs/play.gif'
import back from '../assets/svgs/back.svg'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination/Pagination'
import axios from 'axios'
import { API_BASE } from '../middleware/API_BASE'

const DocumentOwners = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState([])
  const [sortOrder, setSortOrder] = useState('asc')
  const [filteredData, setFilteredData] = useState([])

  const [currentPage, setCurrentPage] = useState(1) // Track the current page
  const usersPerPage = 10

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredData?.slice(indexOfFirstUser, indexOfLastUser)

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/multipart/form',
        'x-api-key': 987654,
      },
    }

    axios
      .get(API_BASE + 'document_count', config)
      .then((res) => {
        const apiData = res.data.result
        const dataWithId = apiData.map((item, index) => ({
          ...item,
          id: index + 1, // You can use a more appropriate logic to generate IDs
        }))
        setFilteredData(dataWithId)
        setSortedData(dataWithId)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
    const filtered = sortedData.filter(
      (item) =>
        // item.firstName.toLowerCase().includes(searchValue) ||
        item.document_owner.toLowerCase().includes(searchValue) ||
        item.department.toLowerCase().includes(searchValue)
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
          <h3 className="flex text-lg font-bold text-left">Document Owners</h3>
        </div>

        <div className="items-center hidden space-x-10 md:flex w-72">
          {/* <Search placeholder="Search..." /> */}
          <div className="rounded w-full border-b border-[#4ECCA3] px-5 py-2 text-gray-500 focus-within:text-gray-500 bg-[#f4f4f4] focus:outline-none focus:bg-[#f4f4f4] ">
            {/* <span className="absolute inset-y-0 right-0 z-10 flex items-center mr-3">
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
      {currentUsers.length > 0 ? (
        <div>
          <div className="max-w-full overflow-x-auto bg-white border rounded-md border-stroke shadow-default">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left bg-green">
                  <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4 xl:pl-11">
                    Owner
                  </th>
                  <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4">
                    Document Count
                  </th>
                  <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4">
                    Department
                  </th>
                  <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4">
                    Email Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers?.map((owner) => {
                  const encodedValue = btoa(owner.document_owner.toString())
                  return (
                    <tr key={owner.id}>
                      <td className="p-4 border-b border-border_color xl:pl-11">
                        <Link to={`/layout/documentOwners/${encodedValue}`}>
                          <p className="font-medium text-black">
                            {/* a{owner.document_owner} */}
                            {owner.document_owner}
                          </p>
                        </Link>
                      </td>
                      <td className="p-4 border-b border-border_color dark:border-strokedark">
                        <p className="text-center ">{owner.txn_count}</p>
                      </td>
                      <td className="p-4 border-b border-border_color dark:border-strokedark">
                        <p className="text-black">{owner.department}</p>
                      </td>
                      <td className="p-4 border-b border-border_color dark:border-strokedark">
                        <p className="text-black">{owner.email}</p>
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
              totalCount={filteredData?.length}
              pageSize={usersPerPage}
              siblingCount={1}
              className="my-3"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-40 sm:mt-60">
          <span className="font-semibold text-lg sm:text-[30px]">
            No Document Owners Available
          </span>
        </div>
      )}
    </>
  )
}

export default DocumentOwners
