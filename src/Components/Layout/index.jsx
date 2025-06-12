import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "../Footer/Footer"


function Layout() {
  return (
     <>
    <div>
        {/* Add Header Component Here */}
        <main>
            <Outlet/> 
        </main>        
        {/* Add Footer Component Here */}
        <Footer />
    </div>   
   
    </>
  )
}

export default Layout