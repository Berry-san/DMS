import back from '../assets/svgs/back.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination/Pagination'
import axios from 'axios'
import { API_BASE } from '../middleware/API_BASE'

const DocumentTrail = () => {
  const { docName } = useParams()
  const decodedID = String(atob(docName))

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState([])
  const [sortOrder, setSortOrder] = useState('asc')
  const [filteredData, setFilteredData] = useState([])

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
      .get(API_BASE + `user_veiw_list?document_name=${decodedID}`, config)
      .then((res) => {
        const apiData = res.data.result
        const dataWithId = apiData.map((item, index) => ({
          ...item,
          id: index + 1,
        }))
        setFilteredData(dataWithId)
        setSortedData(dataWithId)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [decodedID])

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
    const filtered = sortedData.filter(
      (item) =>
        item.firstName.toLowerCase().includes(searchValue) ||
        item.document_owner.toLowerCase().includes(searchValue)
    )
    setFilteredData(filtered)
  }

  const handleSortByDate = () => {
    // Use the current sorting order to determine the new order
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'

    const sorted = [...filteredData].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return new Date(a.inserted_dt) - new Date(b.inserted_dt)
      } else {
        return new Date(b.inserted_dt) - new Date(a.inserted_dt)
      }
    })

    setFilteredData(sorted)
    setSortOrder(newSortOrder)
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
          <h3 className="flex text-lg font-bold text-left">
            {decodedID} Audit Trail
          </h3>
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
      {filteredData.length < 0 ? (
        <div>
          <div className="border rounded border-border_color">
            <table className="w-full table-auto">
              <thead className="text-sm font-bold bg-green">
                <tr className="text-left bg-green">
                  <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4 xl:pl-11">
                    Name
                  </th>
                  <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4">
                    Document
                  </th>
                  <th className="px-2 py-2 font-medium text-black md:py-4 md:px-4">
                    Action
                  </th>
                  <th
                    className="px-2 py-2 font-medium text-black cursor-pointer md:py-4 md:px-4"
                    onClick={handleSortByDate}
                  >
                    Date {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium leading-5">
                {currentUsers?.map((owner) => {
                  return (
                    <tr key={owner.id}>
                      <td className="p-4 border-b border-border_color xl:pl-11">
                        <p className="font-medium text-black">{owner.email}</p>
                      </td>
                      <td className="p-4 border-b border-border_color dark:border-strokedark">
                        <p className="text-black truncate max-w-[10rem]">
                          {owner.document_name}
                        </p>
                      </td>
                      <td className="p-4 border-b border-border_color dark:border-strokedark">
                        <p className="text-black truncate max-w-[10rem]">
                          {owner.action_perform}
                        </p>
                      </td>
                      <td className="p-4 border-b border-border_color dark:border-strokedark">
                        <p className="text-black">{owner.inserted_dt}</p>
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
      ) : (
        <div className="flex items-center justify-center mt-40 sm:mt-60">
          <span className="font-semibold text-lg sm:text-[30px]">
            No Trail For This Document
          </span>
        </div>
      )}
    </>
  )
}

export default DocumentTrail
