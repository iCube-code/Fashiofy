import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Layout from './Components/Layout'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import { LoginPopupProvider } from './Components/LoginPopup/LoginPopupContext'


function App() {
  return (
    <LoginPopupProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
      </Routes>
      <LoginPopup />
    </LoginPopupProvider>
  )
}

export default App
