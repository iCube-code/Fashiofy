import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openRegisterPopUp, setOpenRegisterPopUp] = useState(false);
  const [showOtp, setShowOtp] = useState(false)
  const [openForgetPassword, setOpenForgetPassword] = useState(false)

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function onClickOpenRegisterPopup() {
    setOpenRegisterPopUp(true);
  }

  function onClickCloseRegisterPopUp() {
    setOpenRegisterPopUp(false);
  }

  function handleOpenOtp(){        
    setShowOtp(true)
  }
  
  function handleCloseOtp(){
    setShowOtp(false)
  }

  function handleOpenForgetPassword(){
    setOpenForgetPassword(true)
  }

    function handleCloseForgetPassword(){
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
