import React,  { useState } from 'react'
import './SetupPassword.css'
import { TextField } from '@mui/material'
import logo from "../../assets/logo-1.jpeg";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";


function SetupPassword() {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return(
    <div className='setupPassword-screen'>
       <div className='logo'>
         <img src={logo} alt="Logo" />
       </div>

        <div className='setupPassword-container'>
          <div className='setupPassword-header'>
              <span>Setup Password</span>
         </div>

         <form>
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
         </div>
    </div>
  )
}

export default SetupPassword
