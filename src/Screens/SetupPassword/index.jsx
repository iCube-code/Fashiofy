import React,  { useState, useEffect } from 'react'
import './SetupPassword.css'
import { TextField } from '@mui/material'
import logo from "../../assets/logo-1.jpeg";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {isValidPassword} from '../../utils/validators'
import CryptoJS from "crypto-js";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI
const secretKey = "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f";

function SetupPassword() {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLinkValid, setIsLinkValid] = useState(true);
  const [decryptedData, setDecryptedData] = useState(null); 

  const {userId} = useParams();
  const navigate = useNavigate();

    useEffect(() => {
    if (!userId) {
      toast.error("Link is broken or invalid. Please request a new password reset.");
      return;
    }

    try {
      const encryptedUserId = decodeURIComponent(userId);
      const bytes = CryptoJS.AES.decrypt(encryptedUserId, secretKey);
      const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if (!decrypted.expiresAt || Date.now() > decrypted.expiresAt) {
        setIsLinkValid(false);
        return;
      }
  
      if (!decrypted.userid) {
        toast.error("Decryption failed. Please check your reset link.");
        return;
      }
      setDecryptedData(decrypted);
    } 
    catch{      
      toast.error("Something went wrong while decrypting the ID.");
    }
  }, [userId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Both the fields must be filled");
      return;
    }

    if(newPassword !== confirmPassword ) {
      toast.error("Passwords are not matching");
      return;
    }

    if (!isValidPassword(newPassword)) {
      toast.error("Password must be at least 8 characters long that include uppercase, lowercase, number, and special character");
      return;
    }

    if (!decryptedData.expiresAt || Date.now() > decryptedData.expiresAt) {
      setIsLinkValid(false);
      return;
    }


    try {
        const payload = {
        userId: decryptedData.userid, 
        newPassword,
      };
      
      const response = await axios.post(`${BACKEND_URI}/user/account/reset-password`, payload);
      toast.success(response.data.message || "Password Reset Successfull.");
      navigate("/");
    }
    
    catch (error) {      
      const errorMsg = error.response?.data?.error || "Reset Failed. Try again.";
      toast.error(errorMsg);
  }
  }

  return(
    <div className='setupPassword-screen'>
       <div className='logo'>
         <img src={logo} alt="Logo" />
       </div>

        <div className='setupPassword-container'>
          <div className='setupPassword-header'>
              <span>Setup Password</span>
         </div>

         {isLinkValid ? (

         <form onSubmit={handleSubmit}>
              <div className='setupPassword-text-field'>
                    <TextField 
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    label="New Password"
                    placeholder='Enter New Password'
                    variant="outlined"
                    margin='dense'
                    fullWidth
                    autoComplete="off"
                    autoFocus
                  />

                  <button type='button' className='setupPassword-eye-icon' onClick={()=>setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button> 
              </div>

              <div className='setupPassword-text-field'>
                  <TextField 
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label="Confirm Password"
                  placeholder='Confirm Password'
                  variant="outlined"
                  margin='dense'
                  fullWidth
                  autoComplete="off"
                />

                  <button type='button' className='setupPassword-eye-icon' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
              </div>

              <div className='setupPassword-actions'>
                <button>Reset</button>
             </div>
            
         </form>

         ):(
          <h1>Link Expired. Please request a new one.</h1>
         )}
         </div>
    </div>
  )
}

export default SetupPassword
