/* eslint-disable react/prop-types */
import logo from '../../assets/svgs/logo.svg'
import leftArrow from '../../assets/svgs/leftArrow.svg'
import logout from '../../assets/svgs/logout.svg'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { SUPERADMIN_SIDEBAR_LINKS } from '../lib/constants/navigation'
import { ADMIN_SIDEBAR_LINKS } from '../lib/constants/navigation'
import { USER_SIDEBAR_LINKS } from '../lib/constants/navigation'
import Logout from '../Auth/Logout'
import { useSelector } from 'react-redux'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const trigger = useRef(null)
  const sidebar = useRef(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )

  const [overlayActive, setOverlayActive] = useState(false)
  const { role, firstname, lastname } = useSelector((state) => state.user.user)
  console.log(role)
  let date = new Date().toUTCString().slice(5, 16)

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }

    const resizeHandler = () => {
      if (window.innerWidth >= 1279) {
        setSidebarOpen(false)
        setOverlayActive(false)
      }
    }
    document.addEventListener('click', clickHandler)
    window.addEventListener('resize', resizeHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
      window.removeEventListener('resize', resizeHandler)
    }
  }, [sidebarOpen, setSidebarOpen])

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }

    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [sidebarOpen, setSidebarOpen])

  useEffect(() => {
    sessionStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
    setOverlayActive(sidebarOpen)
  }, [sidebarExpanded, sidebarOpen])

  let content
  if (+role === 1) {
    content = SUPERADMIN_SIDEBAR_LINKS
  } else if (+role === 2) {
    content = ADMIN_SIDEBAR_LINKS
  } else if (+role === 3) {
    content = USER_SIDEBAR_LINKS
  }
  return (
    <div className="relative">
      {overlayActive && window.innerWidth <= 1024 && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black opacity-40"
        ></div>
      )}
      <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-40 flex h-screen w-80 flex-col overflow-y-hidden bg-green px-2 duration-300 ease-linear  lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between gap-2 py-5.5 lg:py-6.5 border-b border-black_color">
          <NavLink to="./">
            <div className="flex w-full gap-2 pt-3 pb-3 items- ">
              <img src={logo} alt="logo" />
              <span className="font-bold text-neutral-700 ">
                DOCUMENT MANAGEMENT SYSTEM
              </span>
            </div>
          </NavLink>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <img src={leftArrow} alt="" />
          </button>
        </div>
        {/* SIDEBAR HEADER */}

        <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear no-scrollbar">
          {/* Sidebar Menu */}
          <nav className="px-4 py-6 mt-5 border-b border-dashed lg:mt-5 lg:pb-10 lg:px-6 border-black_color">
            {/* Menu Group */}
            <div>
              <ul className="flex flex-col gap-2 mb-6">
                {/* Menu Item Dashboard */}

                {/* Menu Item Dashboard */}
                {role &&
                  content.map((link) => (
                    <SidebarLinks
                      key={link.key}
                      link={link}
                      onClick={() => setSidebarOpen(false)}
                    />
                  ))}
                <div className="group relative flex items-center gap-2.5 font-semibold rounded-sm py-2  text-dark_color duration-300 ease-in-out">
                  <img src={logout} className="w-6 h-6" alt="" />
                  <Logout />
                </div>
              </ul>
            </div>
          </nav>

          <div className="flex items-center justify-start flex-1 px-4 space-x-5 lg:px-6">
            <div className="bg-black_color text-dull_white text-sm font-semibold p-3 rounded-full tracking-[0.7px]">
              {firstname?.charAt(0)}
              {lastname?.charAt(0)}
            </div>
            <div className="py-16 my-auto">
              <p className="text-sm font-semibold tracking-[0.7px]">
                {firstname} {lastname}
              </p>
              <p className="text-sm font-medium text-black_color">{date}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

function SidebarLinks({ link, onClick }) {
  return (
    <li>
      <NavLink
        onClick={onClick}
        to={link.path}
        className="group relative flex items-center gap-2.5 font-semibold rounded-sm py-2  text-dark_color duration-300 ease-in-out"
      >
        <img src={link.icon} className="w-6 h-6" alt="" />
        {link.label}
      </NavLink>
    </li>
  )
}

export default Sidebar
