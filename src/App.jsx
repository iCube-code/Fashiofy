import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function AppContent() {
  const { open, openRegisterPopUp, openForgetPassword } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path='/Cart' element={<Cart />} />
        </Route>
      </Routes>
      {open && <LoginPopup />}
      {openRegisterPopUp && <RegisterPage />}
      {openForgetPassword && <ForgetPassword />}
      <ToastContainer position="top-center" theme="dark"/>
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
