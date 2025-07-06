import { useState, useRef, useEffect, useContext } from 'react'
import './Otp.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setCookie } from '../../utils/cookies'
import useTimer from '../../hooks/useTimer'
import { AuthContext } from '../../context/AuthContext'
import {  Dialog } from '@mui/material'

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

function Otp() {

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const otpRef = useRef([])
    const [isResend, setIsResend] = useState(false)

    const { email, password, handleOpenOtp, handleCloseOtp } = useContext(AuthContext)

    const { minutes, seconds, startTimer } = useTimer(0, 30)

    useEffect(() => {
        startTimer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const handleResendOTP = async () => {

        try {

            let response = await axios.post(`${BACKEND_URI}/user/account/login`, {
                email,
                password
            })

            if (response.data.status) {
                setIsResend(true)
                toast.success("OTP has resent the your mail address")
            }
        }
        catch (err) {
            toast.error("Something went wrong")
            console.error('error in resend otp', err)
        }

    }

    return (
        <Dialog open={handleOpenOtp} onClose={handleCloseOtp}>
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
                                    key={index + "adada"}
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
                          {
                            !isResend && (
                                (parseInt(minutes) === 0 && parseInt(seconds) === 0) ? (
                                    <span className='text-[#11bddb] underline cursor-pointer' onClick={handleResendOTP}>Resend</span>
                                ) : (
                                    <span>
                                    Resend Otp in {minutes}:{seconds}
                                    </span>
                                )
                          )}
                        <p>Make sure you enter a valid OTP that was sent to your email</p>
                    </div>
                    <div className='otp-box-actions'>
                        <button onClick={handleOTPVerify}>Validate</button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default Otp