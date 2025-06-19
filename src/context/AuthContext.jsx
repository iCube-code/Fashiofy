import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openRegisterPopUp, setOpenRegisterPopUp] = useState(false);

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

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
