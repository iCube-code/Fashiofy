import React, { createContext, useState } from "react";

const LoginPopupContext = createContext();

const LoginPopupProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openRegisterPopUp, setOPenRegisterPopUp] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function onClickOpenRegisterPopup() {
    setOPenRegisterPopUp(true);
  }
  function onClickCloseRegisterPopUp() {
    setOPenRegisterPopUp(false);
  }

  return (
    <LoginPopupContext.Provider
      value={{
        open,
        handleOpen,
        handleClose,
        openRegisterPopUp,
        onClickOpenRegisterPopup,
        onClickCloseRegisterPopUp,
      }}
    >
      {children}
    </LoginPopupContext.Provider>
  );
};

export { LoginPopupContext, LoginPopupProvider };
