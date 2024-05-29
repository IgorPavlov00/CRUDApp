import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Email.css';

const EmailConfirmation = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('');


    useEffect(() => {
        const confirmEmail = async () => {
            try {
                // Ensure the token is sent as a plain string
                const response = await axios.post(`http://localhost:8084/api/auth/confirm`, token);
                setStatus('Account confirmed successfully!');
                // Redirect to login page after successful confirmation

                <a href={'/'}>Login</a>
            } catch (error) {
                console.log(token);
                setStatus('Error confirming account. Please try again.');
            }
        };
        confirmEmail();
    }, [token]);

    return (
        <div>

            <div className="wrapperAlert">
                <div className="contentAlert">
                    <div className="topHalf">
                        <p>
                            <svg viewBox="0 0 512 512" width="100" title="check-circle">
                                <path
                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                />
                            </svg>
                        </p>
                        <h1>Congratulations</h1>
                        <ul className="bg-bubbles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="bottomHalf">
                        <p>{status}</p>
                        <a href={'/'}>
                            <button id="alertMO">Log in</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default EmailConfirmation;
