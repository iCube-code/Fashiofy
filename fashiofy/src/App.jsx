import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/aboutus' element={<h1>AboutUs</h1>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
