import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "../Footer/Footer"
import SideNav from '../Sidebar/SideNav'
import Home from '../../Pages/HomePage'


function Layout() {
  return (
    <>
      <div className='flex '>
        {/* Add Header Component Here */}
        <div className>
          <SideNav />
        </div>
        <div className>
          <main>
            <Outlet />
          </main>
          {/* Add Footer Component Here */}
        </div>
      </div>
      <div>
        <Footer />
      </div>

    </>
  )
}

export default Layout