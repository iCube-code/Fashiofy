import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import Products from "./Screens/Products/Products";
import RegisterPage from "./Pages/RegisterPage";
import Wishlist from "./Components/Wishlist/Wishlist";
import Cart from "./Components/Cart/Cart";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import ForgetPassword from "./Components/ForgetPassword"
import { getCookie } from "./utils/cookies";
import NotFound404 from "./Components/NotFound";
import Otp from "./Components/OTP";

function AppContent() {

  const { open, openRegisterPopUp, openForgetPassword, showOtp} = useContext(AuthContext);
  let isLoggedIn = getCookie('token') !== null

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path='/Cart' element={<Cart />} />
          <Route element={isLoggedIn ? <Outlet /> : <NotFound404 />}>
          <Route path="/user" element={<h1>Users</h1>} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFound404 />} />
      </Routes>
      {open && <LoginPopup />}
      {openRegisterPopUp && <RegisterPage />}
      {openForgetPassword && <ForgetPassword />}
      {showOtp && <Otp />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
