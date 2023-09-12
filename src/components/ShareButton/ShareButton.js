import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
// import forward from '../../assets/svgs/forward.svg'

const ShareButton = ({ link, icon }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown()
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!isDropdownOpen || keyCode !== 27) return
      setIsDropdownOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  //   const link = 'hello'

  const copyLink = () => {
    const linkToCopy = link

    // // Create a temporary input element to copy the link to the clipboard
    // const tempInput = document.createElement('input')
    // document.body.appendChild(tempInput)
    // tempInput.value = linkToCopy
    // tempInput.select()

    // // Execute the 'copy' command
    // document.execCommand('copy')

    // // Remove the temporary input element
    // document.body.removeChild(tempInput)
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        // Notify the user that the link has been copied
        toast.success('Link copied to clipboard')
        closeDropdown()
      })
      .catch((error) => {
        // Handle any errors that may occur during copying
        toast.error('Error copying link:', error)
      })
    closeDropdown()
  }

  const forwardToEmail = () => {
    const gmailURL = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to&su=Shared%20Link&body=${encodeURIComponent(
      link
    )}`
    window.open(gmailURL, '_blank')
    toast.success('Forwarded to email!')
    closeDropdown()
  }

  const forwardToWhatsApp = () => {
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      link
    )}`
    window.open(whatsappURL, '_blank')
    toast.success('Forwarded to WhatsApp!')
    closeDropdown()
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center p-2"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        ref={dropdownRef}
      >
        <img src={icon} alt="" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-20 w-40 mt-2 bg-white rounded-md shadow-lg">
          <div
            className="flex flex-col py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={copyLink}
              className="py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Copy Link
            </button>
            <button
              onClick={forwardToEmail}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Email
            </button>
            <button
              onClick={forwardToWhatsApp}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShareButton
