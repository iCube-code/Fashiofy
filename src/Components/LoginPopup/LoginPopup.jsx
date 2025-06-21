import React,{useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField,} from '@mui/material'
import './LoginPopup.css'
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { SiFacebook } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import Otp from '../OTP';

function LoginPopup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const { open, handleClose, onClickOpenRegisterPopup, showOtp, handleOpenOtp, handleCloseOtp } = useContext(AuthContext); 
     
    return (
    <>   
    <Dialog open={open} className='dialog'
    onClose={() => {
    handleClose();
    handleCloseOtp();}}>

    {showOtp ? (
        <Otp />
    ):( 

    <div className='dialog-box'>
                    
    <Button onClick={handleClose} className='dialog-close'>{<AiOutlineClose size={25}/>}</Button>
                    
            <DialogTitle className='dialog-title'>
                <span>Welcome Back</span>
                <p>Please enter your Account Details</p>                                                   
            </DialogTitle>

          <DialogContent className="dialog-content">
            <TextField
              className="text-field"
              autoFocus
              label="Email"
              id="email"
              type="email"
              margin="dense"
              variant="outlined"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <TextField
              className="text-field"
              label="Password"
              id="password"
              type="password"
              margin="dense"
              variant="outlined"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />

            <div className="forget-password">
              <Link>Forgot Password?</Link>
            </div>

                <Button onClick={handleOpenOtp}  className='sign-in-button'>Sign in</Button>

                            </DialogContent>
                
                            <DialogActions className='dialog-acions'>                               
                                <button className='google-icon'>{<FcGoogle size={30} />}</button>
                                <button className='github-icon'>{<ImGithub size={30}/>}</button>
                                <button className='facebook-icon'>{<SiFacebook size={30} />}</button> 
                            </DialogActions>

                            <div className="flex justify-center">
                                <button
                                className="text-white cursor-pointer mt-3"
                                onClick={() => {
                               handleClose();
                                onClickOpenRegisterPopup();
                                }}
                                >
                                Create Account
                                </button>
                                </div>
                 </div>
            )
        }
            </Dialog>
    </>
    )
}

export default LoginPopup;
