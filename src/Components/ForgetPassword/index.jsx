import React, {useContext, useState} from 'react'
import {TextField} from '@mui/material'
import './ForgetPassword.css'
import { AuthContext } from '../../context/AuthContext';
import { Dialog } from "@mui/material";
import axios from 'axios';
import { toast } from 'react-toastify';


function ForgetPassword() {
    const [email, setEmail] = useState("");
    const{openForgetPassword, handleCloseForgetPassword} = useContext(AuthContext)

    const handleSend = async() => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/account/forgot-password',{email});
            toast.success(response.data.message || "Reset Link sent to your email");
        }
        catch (error) {
            const errorMsg = error.response?.data?.error || "Something went wrong. Please try again.";
            toast.error(errorMsg);
        }
    }

  return (
    <Dialog open={openForgetPassword} onClose={handleCloseForgetPassword} className='forget-password-page'>
        <div className='forget-password-box'>
            <div className='forget-password-title'>
                Forget Password
            </div>
            <div className='forget-password-content'>
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
            </div>
            <div className='forget-password-actions'>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    </Dialog>
  )
}

export default ForgetPassword