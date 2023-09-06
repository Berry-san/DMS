import React from 'react'
import { usePagination, DOTS } from './usePagination'

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === paginationRange[paginationRange.length - 1]

  return (
    <div className="items-center flex mt-5">
      <button
        className={
          isFirstPage
            ? 'bg-green/50 rounded p-1 me-3'
            : 'bg-green rounded p-1 me-3'
        }
        onClick={onPrevious}
        disabled={isFirstPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15.16 7.41L10.58 12L15.16 16.59L13.75 18L7.75 12L13.75 6L15.16 7.41Z"
            fill="#393E46"
          />
        </svg>
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span key={index} className="px-3 py-1">
              ...
            </span>
          )
        }

        return (
          <button
            key={pageNumber}
            className={`border border-green ${
              pageNumber === currentPage ? 'bg-green text-white' : 'text-green'
            } rounded px-3 py-1 me-3 font-bold text-sm`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })}
      <button
        className={
          isLastPage ? 'bg-green/50 rounded p-1' : 'bg-green rounded p-1'
        }
        onClick={onNext}
        disabled={isLastPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8.83997 7.41L13.42 12L8.83997 16.59L10.25 18L16.25 12L10.25 6L8.83997 7.41Z"
            fill="#393E46"
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
