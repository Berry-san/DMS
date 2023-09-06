import { useState } from 'react'
const Search = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event) => {
    const searchText = event.target.value
    setSearchTerm(searchText)

    // const filteredResults = users.filter(
    //   (item) =>
    //     item.owner.toLowerCase().includes(searchText.toLowerCase()) ||
    //     item.department.toLowerCase().includes(searchText.toLowerCase())
    // )
    // setSearchResults(filteredResults)
  }

  return (
    <>
      <div className="rounded w-full border-b border-[#4ECCA3] relative px-5 py-2 text-gray-500 focus-within:text-gray-500 bg-[#f4f4f4] focus:outline-none focus:bg-[#f4f4f4] ">
        <span className="absolute inset-y-0 right-0 flex items-center mr-3">
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
        </span>
        <input
          type="search"
          name="search"
          className="w-full text-sm focus:outline-none bg-[#f4f4f4]"
          autoComplete="off"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </>
  )
}

export default Search
