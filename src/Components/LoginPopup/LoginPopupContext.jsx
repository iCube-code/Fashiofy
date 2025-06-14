import React , {createContext, useState} from "react";

const LoginPopupContext = createContext()

const LoginPopupProvider = ({children}) => {
    const [open, setOpen] = useState(false)

     function handleOpen(){
        setOpen(true)
    }

     function handleClose(){
        setOpen(false)
    }

    return(
        <LoginPopupContext.Provider value={{open, handleOpen, handleClose}}>
            {children}
        </LoginPopupContext.Provider>
    )
}

export {LoginPopupContext, LoginPopupProvider}
