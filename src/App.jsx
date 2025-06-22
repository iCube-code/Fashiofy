import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import Products from "./Screens/Products/Products";
import RegisterPage from "./Pages/RegisterPage";
import Wishlist from "./Components/Wishlist/Wishlist";
import Cart from "./Components/Cart/Cart"

import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

function AppContent() {
  const { open, openRegisterPopUp } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path='/Cart' element={<Cart />}/>
        </Route>
      </Routes>
      {open && <LoginPopup />}
      {openRegisterPopUp && <RegisterPage />}
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
