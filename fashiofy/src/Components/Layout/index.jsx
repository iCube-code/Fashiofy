import React from 'react'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
     <>
    <div>
        {/* Add Header Component Here */}
        <main>
            <Outlet/> 
        </main>        
        {/* Add Footer Component Here */}
    </div>   
   
    </>
  )
}

export default Layout