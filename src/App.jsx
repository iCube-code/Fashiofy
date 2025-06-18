import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Layout from './Components/Layout'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import { LoginPopupProvider } from './Components/LoginPopup/LoginPopupContext'
import Products from './Screens/Products/Products'
import Wishlist from './Components/Wishlist/Wishlist'


function App() {
  return (
    <LoginPopupProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/Wishlist' element={<Wishlist />}/>
          {/* <Route path='/Cart' element={<Cart />}/> */}
        </Route>
      </Routes>
      <LoginPopup />
    </LoginPopupProvider>
  )
}

export default App
