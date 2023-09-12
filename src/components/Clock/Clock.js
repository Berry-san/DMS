import React, { useState, useEffect } from 'react'

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update the time every second

    return () => clearInterval(intervalId)
  }, [])

  const formatDate = (date) => {
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      //   year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }

    return date.toLocaleDateString(undefined, options)
  }

  return (
    <div>
      <p className="text-sm font-semibold tracking-[0.7px]">
        {formatDate(currentTime)}
      </p>
    </div>
  )
}

export default Clock
