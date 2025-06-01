import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

function index() {
  return (
     <>
    <div>
        <Header/>
        <main>
            <Outlet/>
        </main>        
        <Footer/>
    </div>   
   
    </>
  )
}

export default index