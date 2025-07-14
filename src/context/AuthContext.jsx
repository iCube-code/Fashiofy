import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openRegisterPopUp, setOpenRegisterPopUp] = useState(false);
  const [showOtp, setShowOtp] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [openForgetPassword, setOpenForgetPassword] = useState(false)

  function handleResetLogin() {
    setEmail('')
    setPassword('')
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    handleResetLogin()
  }

  function onClickOpenRegisterPopup() {
    setOpenRegisterPopUp(true);
  }

  function onClickCloseRegisterPopUp() {
    setOpenRegisterPopUp(false);
  }

  function handleOpenOtp() {
    setShowOtp(true)
    setOpen(false)
  }

  function handleCloseOtp() {
    setShowOtp(false)
    handleResetLogin()
  }

  function handleOpenForgetPassword() {
    setOpenForgetPassword(true)
  }

  function handleCloseForgetPassword() {
    setOpenForgetPassword(false)
  }

  return (
    <AuthContext.Provider
      value={{
        open,
        handleOpen,
        handleClose,
        openRegisterPopUp,
        onClickOpenRegisterPopup,
        onClickCloseRegisterPopUp,
        showOtp,
        handleOpenOtp,
        handleCloseOtp,
        email,
        setEmail,
        password,
        setPassword,
        openForgetPassword,
        handleOpenForgetPassword,
        handleCloseForgetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
