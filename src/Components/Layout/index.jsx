import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import Footer from "../Footer/Footer"
import SideNav from '../Sidebar/SideNav'

function Layout() {
  const location = useLocation();
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <div className='flex'>
      {/* Add Header Component Here */}
      <div className='h-screen'>
        <SideNav />
      </div>
      <div
        ref={scrollRef}
        className=' w-full h-screen flex flex-col justify-between overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200'>
        <Outlet />
        {/* Add Footer Component Here */}
        <Footer />
      </div>
    </div>
  )
}

export default Layout