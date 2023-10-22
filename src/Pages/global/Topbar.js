import hamburger from '../../assets/svgs/hamburger.svg'
import DropdownUser from '../../components/DropdownUser/DropdownUser'

const Topbar = (props) => {
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
          <DropdownUser />
        </div>
      </div>
    </header>
  )
}

export default Topbar
