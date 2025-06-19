import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import Products from "./Screens/Products/Products";
import RegisterPage from "./Pages/RegisterPage";
import Wishlist from "./Components/Wishlist/Wishlist";

import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

function AppContent() {
  const { openRegisterPopUp, onClickCloseRegisterPopUp } =
    useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          {/* <Route path='/Cart' element={<Cart />}/> */}
        </Route>
      </Routes>

      <LoginPopup />

      {openRegisterPopUp && (
        <RegisterPage onClose={onClickCloseRegisterPopUp} />
      )}
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
