import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Layout from './Components/Layout'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import { LoginPopupProvider } from './Components/LoginPopup/LoginPopupContext'
import Products from './Screens/Products/Products'


function App() {
  return (
    <LoginPopupProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />   
        <Route path='/products' element={<Products />} />     
      </Route>    
    </Routes>
    <LoginPopup/>
    </LoginPopupProvider>
  )
}

export default App
