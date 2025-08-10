import React, { useState } from 'react'
import './SellerRegister.css'
import { TextField, Select, MenuItem } from '@mui/material'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { isValidEmail, isValidPassword, isValidPhoneNumber } from '../../utils/validators'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

function SellerRegister() {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [organization, setOrganization] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState('')
    const [selectedCode, setSelectedCode] = useState('+91');

    async function handleAffiliate() {

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        if (!isValidPassword(password)) {
            toast.error("Password must be at least 8 characters long that include uppercase, lowercase, number, and special character");
            return;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            toast.error("Please enter a valid 10 digit Phone Number");
            return;
        }

        if (!firstName || !lastName || !email || !phoneNumber || !organization || !password) {
            toast.error("All fields must be filled");
            return;
        }

        try {
            // api call
            let response = await axios.post(`${BACKEND_URI}/seller/account/new`, {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                organization,
                shopAddress: "NA",
            })

            // get the response 
            if (response.status === 201) {
                // navigate to home page
                if (response.data.status === 'success') {
                    toast.error("Success");
                    navigate('/')
                }
                else {
                    toast.error("Something went Wrong");
                }
            }
            else {
                toast.error("Something went Wrong");
            }
        }
        catch (err) {
            toast.error("Something went Wrong");
            console.error(err)
        }
    }

    return (
        <div className='seller-register-screen'>
            <div className='seller-register-box'>
                <span className='seller-register-header'>Affiliate with Fashiofy</span>
                <form>
                    <div className='seller-register-fields-wrap'>
                        <div className='seller-register-fields seller-register-firstName'>
                            <TextField
                                type='text'
                                label='First Name'
                                placeholder='Enter First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                variant="outlined"
                                margin='dense'
                                fullWidth
                                autoFocus
                            />
                        </div>
                        <div className='seller-register-fields seller-register-lastName'>
                            <TextField
                                type='text'
                                label='Last Name'
                                placeholder='Enter Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                variant="outlined"
                                margin='dense'
                                fullWidth />
                        </div>
                    </div>
                    <div className='seller-register-fields'>
                        <TextField
                            type='email'
                            label='Email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            margin='dense'
                            fullWidth
                        />
                    </div>
                    <div className='seller-register-fields-wrap'>
                        <div className='seller-register-fields seller-register-countryCode'>
                            <Select
                                value={selectedCode}
                                onChange={(e) => setSelectedCode(e.target.value)}
                            >
                                <MenuItem value="+91">+91</MenuItem>
                                <MenuItem value="+1">+1</MenuItem>
                                <MenuItem value="+44">+44</MenuItem>
                                <MenuItem value="+81">+81</MenuItem>

                            </Select>
                        </div>
                        <div className='seller-register-fields seller-register-phoneNumber'>
                            <TextField
                                type='number'
                                label='Phone Number'
                                placeholder='Enter Phone Number'
                                value={phoneNumber}
                                onChange={(e) => { setPhoneNumber(e.target.value) }}
                                maxLength="10"
                                onInput={(e) => {
                                    if (e.target.value.length > 10) {
                                        e.target.value = e.target.value.slice(0, 10);
                                    }
                                }}
                                variant='outlined'
                                margin='dense'
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className='seller-register-fields'>
                        <TextField
                            type='text'
                            label='Organization'
                            placeholder='Enter your Organization Name'
                            value={organization}
                            onChange={(e) => { setOrganization(e.target.value) }}
                            variant='outlined'
                            margin='dense'
                            fullWidth
                        />
                    </div>
                    <div className='seller-register-fields seller-register-password'>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            label='Password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            variant='outlined'
                            margin='dense'
                            fullWidth
                        />

                        <button type='button' className='seller-register-eye-icon' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    <div className='seller-register-button'>
                        <button type='button' onClick={handleAffiliate}>Affiliate</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellerRegister