import { useState, useRef } from 'react'
import './Otp.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setCookie } from '../../utils/cookies'


const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

function Otp() {

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const otpRef = useRef([])

    function handleChange(index, value) {
        if (isNaN(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < otpRef.current.length - 1) {
            otpRef.current[index + 1].focus()
        }
    }

    function handleErase(index, event) {
        if (event.key === 'Backspace' && index > 0 && !otp[index]) {
            otpRef.current[index - 1].focus()
        }
    }

    const handleOTPVerify = async () => {
        try {

            let otpValue = otp.join('').trim()

            if (otpValue.length < 6) {
                toast.error("Please provide the OTP")
                return false
            }

            let response = await axios.post(`${BACKEND_URI}/user/account/login/verify`, {
                otp: otpValue
            })

            if (response.data.status) {
                // store the JWT in the cookies
                setCookie('token', response.data.token)

                // close the OTP popup
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
        }
        catch (err) {
            console.log('error in otp verification', err)
            toast.error("Something went wrong")
        }

    }

    return (
        <div>
            <div className='otp-page'>
                <div className='otp-box'>
                    <div className='otp-box-title'>
                        <span>Verification</span>
                        <p>A 6 digit OTP has been sent to your email</p>
                    </div>
                    <div className='otp-box-body'>
                        {
                            otp.map((value, index) => (

                                <input className='otp-input'
                                    key={index}
                                    type='text'
                                    maxLength={1}
                                    value={value}
                                    onChange={(event) => handleChange(index, event.target.value)}
                                    onKeyDown={(event) => handleErase(index, event)}
                                    ref={(ref) => (otpRef.current[index] = ref)}
                                />
                            ))
                        }
                    </div>
                    <div className='otp-box-footer'>
                        <span>Resend OTP in 00:30</span>
                        <p>Make sure you enter a valid OTP that was sent to your email</p>
                    </div>
                    <div className='otp-box-actions'>
                        <button onClick={handleOTPVerify}>Validate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otp