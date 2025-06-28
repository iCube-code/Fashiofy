import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField, } from '@mui/material'
import './LoginPopup.css'
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { SiFacebook } from "react-icons/si";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import Otp from '../OTP';
import { isValidEmail, isValidPassword } from '../../utils/validators'
import { toast } from 'react-toastify'
import axios from 'axios'

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

function LoginPopup() {

  const [showPassword, setShowPassword] = useState(false);

  const {
    open,
    handleClose,
    onClickOpenRegisterPopup,
    showOtp,
    handleOpenOtp,
    handleCloseOtp,
    email,
    setEmail,
    password,
    setPassword
  } = useContext(AuthContext);

  function handleEyeIcon() {
    setShowPassword(!showPassword)
  }

  const handleLogin = async () => {

    if (!isValidEmail(email)) {
      toast.error("Please check the email")
      return false;
    }

    if (!isValidPassword(password)) {
      toast.error("Please check the password")
      return false
    }

    try {
      // call the Login api
      let response = await axios.post(`${BACKEND_URI}/user/account/login`, {
        email,
        password
      })
      // based on the response open the OTP box

      if (response.data.status) {
        handleOpenOtp()
      }
      else {
        toast.error("Something went wrong")
      }
    }
    catch (err) {
      console.error("Error in Login", err)
      toast.error("Something went wrong")
    }

  }

  return (
    <Dialog open={open} className='dialog'
      onClose={() => {
        handleClose();
        handleCloseOtp();
      }}>
      {showOtp ? (
        <Otp />
      ) : (
        <div className='dialog-box'>
          <Button onClick={handleClose} className='dialog-close'>{<AiOutlineClose size={25} />}</Button>
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
              autoComplete='off'
            />
            <div className='password-wrapper'>
              <TextField
                className="text-field"
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                margin="dense"
                variant="outlined"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                autoComplete='off'
              />
              <button className='eye-icon' onClick={handleEyeIcon}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <div className="forget-password">
              <Link>Forgot Password?</Link>
            </div>
            <Button onClick={handleLogin} className='sign-in-button'>Sign in</Button>
          </DialogContent>
          <DialogActions className='dialog-acions'>
            <button className='google-icon'>{<FcGoogle size={30} />}</button>
            <button className='github-icon'>{<ImGithub size={30} />}</button>
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
  )
}

export default LoginPopup;
