import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegister = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            toast.error("All fields must be filled");
            return;
        }
        try {

            toast.success("Check your email for verification");
            const response = await axios.post('http://localhost:8084/api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,

            });
            console.log('User registered:', response.data);

        } catch (error) {
            toast.error("Username or email already exists");
            console.error('Error registering user:', error);
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            toast.error("All fields must be filled");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8084/api/auth/login', {
                username: formData.username,
                password: formData.password,
            });
            toast.success("User logged in successfully");
            console.log('User logged in:', response.data);
        } catch (error) {
            toast.error("Invalid username or password");
            console.error('Error logging in user:', error);
        }
    };

    return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUpSubmit}>
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>
                    <input
                        type="text"
                        name="username"
                        placeholder="Name"
                        value={formData.username}
                        onChange={handleChange}
                        id="username" // Ensure the ID matches the CSS selector
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSignInSubmit}>
                    <h1>Sign In</h1>
                    <span>or use your account</span>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        id="username" // Ensure the ID matches the CSS selector
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
