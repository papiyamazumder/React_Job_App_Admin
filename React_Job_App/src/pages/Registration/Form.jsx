import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Rform.css'; // Import the CSS file
import PasswordValidate from './PasswordValidate';
import { checkUserExists,registerUser } from '../../Api/usersApi';

export default function Form() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

    
    // // Function to register a new user
    // const registerUser = async (userData) => {
    //     const response = await fetch('http://localhost:5000/users', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(userData),
    //     });
    //     const data = await response.json();
    //     return data;
    // };

    // // Function to check if user exists
    // const checkUserExists = async (email) => {
    //     const response = await fetch(`http://localhost:5000/users?email=${email}`);
    //     const data = await response.json();
    //     return data.length > 0;
    // };

    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        setSubmitted(false);
        setPasswordError(value.length >= 8 ? false : true);
    };

    const handlePasswordFocus = () => {
        setPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setPasswordFocused(false);
    };

    const handleConfirmPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setSubmitted(false);
        setConfirmPasswordError(value !== password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setError(true);
            return;
        }
        if (passwordError || confirmPasswordError) {
            setError(true);
            return;
        }

        try {
            const userExists = await checkUserExists(email);
            if (userExists) {
                setError(false);
                return;
            }

            // Register user with selected role
            await registerUser({ name, email, password, role:selectedRole });

            setSubmitted(true);
            setError(false);
           

            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const successMessage = () => {
        return (
            <div className="registration-success" style={{ display: submitted ? '' : 'none' }}>
                <h3>User {name} successfully registered!!</h3>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="registration-error" style={{ display: error ? '' : 'none' }}>
                <h3>Please enter all the required fields</h3>
            </div>
        );
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    return (
        <div className="reg-form">
            <div className="registration-form">
                <div>
                    <h1>User Registration</h1>
                </div>
                <div className="registration-messages">
                    {errorMessage()}
                    {successMessage()}
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="registration-label">Name *</label>
                    <input
                        onChange={handleName}
                        className="registration-input"
                        value={name}
                        type="text"
                        placeholder="Enter your name"
                    />
                    <label className="registration-label">Email *</label>
                    <input
                        onChange={handleEmail}
                        className="registration-input"
                        value={email}
                        type="email"
                        placeholder="Enter your email"
                    />
                    <label className="registration-label">Password *</label>
                    <input
                        onChange={handlePassword}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        className="registration-input"
                        value={password}
                        type="password"
                        placeholder="Enter your password"
                    />
                    <PasswordValidate
                        password={password}
                        passwordError={passwordError}
                        confirmPasswordError={confirmPasswordError}
                        focused={passwordFocused}
                    />

                    <label className="registration-label">Confirm Password *</label>
                    <input
                        onChange={handleConfirmPassword}
                        className="registration-input"
                        value={confirmPassword}
                        type="password"
                        placeholder="Confirm your password"
                    />
                    {confirmPasswordError && (
                        <div className="registration-confirm-password-error">
                            <p>Passwords do not match</p>
                        </div>
                    )}

                    <div className="registration-role-dropdown">
                        <label className="registration-label">Role *</label>
                        <select
                            className="registration-input"
                            value={selectedRole}
                            onChange={handleRoleChange}
                            style={{color: selectedRole ? '#000000' : '#808080'}}
                        >
                            <option value="" disabled hidden>Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button className="registration-bt" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
