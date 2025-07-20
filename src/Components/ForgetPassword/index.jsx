import { useContext, useState } from 'react'
import { TextField, Dialog } from '@mui/material'
import './ForgetPassword.css'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { isValidEmail } from '../../utils/validators'

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI


function ForgetPassword() {
    const [email, setEmail] = useState("");
    const { openForgetPassword, handleCloseForgetPassword } = useContext(AuthContext)

    const handleSend = async () => {

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URI}/user/account/forgot-password`, { email });
            toast.success(response.data.message || "Reset Link sent to your email");
            handleCloseForgetPassword();
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
                        autoComplete='off'
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