import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import Products from "./Screens/Products/Products";
import RegisterPage from "./Components/RegisterPopup/RegisterPage";
import Wishlist from "./Components/Wishlist/Wishlist";
import Cart from "./Components/Cart/Cart";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import ForgetPassword from "./Components/ForgetPassword";
import { getCookie } from "./utils/cookies";
import NotFound404 from "./Components/NotFound";
import Otp from "./Components/OTP";
import VerifyEmail from "./Pages/verifyEmail";
import Orders from "./Components/Orders/Orders";
import SetupPassword from "./Screens/SetupPassword";
import ManageProducts from "./Screens/Products/ManageProducts";
import ProductDetails from "./Pages/ProductDetails";
import SellerRegister from "./Screens/SellerRegister";
import UserScreen from "./Components/UserScreen/UserScreen"
function AppContent() {
  const { open, openRegisterPopUp, openForgetPassword, showOtp } = useContext(AuthContext);
  let isLoggedIn = getCookie("token") !== null;

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/seller-register" element={<SellerRegister />} />
          <Route element={isLoggedIn ? <Outlet /> : <NotFound404 />}>
            <Route path="/user" element={<UserScreen />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>

        <Route path="/account/verify/:secret" element={<VerifyEmail />} />
        <Route path="/*" element={<NotFound404 />} />
        <Route path="/forgot-password/:userId" element={<SetupPassword />} />
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
