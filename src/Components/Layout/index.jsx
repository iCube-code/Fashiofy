import { Outlet } from 'react-router-dom'
import Footer from "../Footer/Footer"
import SideNav from '../Sidebar/SideNav'

function Layout() {
  return (
    <div className='flex'>
      {/* Add Header Component Here */}
      <div className='h-screen'>
        <SideNav />
      </div>
      <div className=' w-full h-screen flex flex-col justify-between overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200'>
        <Outlet />
        {/* Add Footer Component Here */}
        <Footer />
      </div>
    </div>
  )
}

export default Layout