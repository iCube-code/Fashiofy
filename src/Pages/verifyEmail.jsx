import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

const VerifyEmail = () => {
    const { secret } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Please verify your email");
    const [isVerified, setIsVerified] = useState(false);

    const handleVerifyUser = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URI}/user/account/verify`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + secret
                    }
                }
            );
            if (response.data.status === true) {
                setMessage(" Your email has been verified successfully!");
                setIsVerified(true)
            } else {
                setMessage(" Verification failed. Please try again.");
                setIsVerified(false)

            }
        } catch (err) {
            console.log("failed", err)
            setMessage(" Invalid or expired verification link.");
            setIsVerified(false)

        }
    };
    const handleContinue = () => {
        navigate("/"); // Redirect to home page
    };

    return (

        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center">
                <div>
                    <img
                        src="https://media.istockphoto.com/id/915760904/photo/envelope-with-check-mark-3d-rendering.jpg?s=612x612&w=0&k=20&c=eiMQ5kz7ucaOeyzG-M3kiPxOm_hV6IXONOLu74bvdn4="
                        alt="image1"
                        className="w-60 h-60"
                    />
                </div>
                <h2 className={`text-lg font-semibold ${isVerified ? "text-green-600" : "text-red-600"}`}>
                    {message}</h2>
                <button
                    className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold cursor-pointer rounded-xl hover:bg-blue-700 transition duration-300"
                    onClick={isVerified ? handleContinue : handleVerifyUser}
                >
                    {isVerified ? "Continue" : "Verify"}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;
