/* eslint-disable react/prop-types */
import light from '../../assets/svgs/light.svg'
import hamburger from '../../assets/svgs/hamburger.svg'
import Clock from '../../components/Clock/Clock'
import { useSelector } from 'react-redux'
import DropdownUser from '../../components/DropdownUser/DropdownUser'

const Topbar = (props) => {
  //   const { state } = useGlobalStoreContext() // Get the global state from the context
  //   const { firstname, lastname } = state.user // Assuming your user data is stored under the "user" key in the state
  const { firstname, lastname } = useSelector((state) => state.user.user)

  return (
    <header className="sticky top-0 z-30 flex w-full bg-white border-b border-border_color drop-shadow-1 ">
      <div className="flex items-center justify-between flex-grow px-1 pt-3 lg:justify-end lg:py-3.5 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className="z-40 block  bg-white p-1.5 lg:hidden"
          >
            <img src={hamburger} className="w-8 h-8" alt="" />
          </button>
        </div>

        <div className="hidden space-x-3 md:flex md:justify-end ">
          {/* <p className="font-semibold">
            Hello, {firstname} {lastname}
          </p>
          <img src={light} className="w-6 h-6" alt="" /> */}
          <DropdownUser />
        </div>
      </div>
    </header>
  )
}

export default Topbar
