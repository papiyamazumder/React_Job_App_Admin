import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Rform.css'; // Import the CSS file
import PasswordValidate from './PasswordValidate';
import { checkUserExists,registerUser } from '../../Api/usersApi';


export default function Form() {
    //#region initializing state and variable
    const navigate = useNavigate(); // Initialize useNavigate hook

    // States for registration 
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password

    // States for checking the errors 
    const [submitted, setSubmitted] = useState(false); 
    const [error, setError] = useState(false); 
    const [passwordError, setPasswordError] = useState(false); // State for password validation error
    const [confirmPasswordError, setConfirmPasswordError] = useState(false); // State for confirm password validation error
    const[userExist,setUserExist]=useState(false);
    //For password checking validation
    const [passwordFocused, setPasswordFocused] = useState(false);
    //#endregion

    //#region handle input fields
    // Handling the name change 
    const handleName = (e) => { 
        setName(e.target.value); 
        setSubmitted(false); 
    }; 

    // Handling the email change 
    const handleEmail = (e) => { 
        setEmail(e.target.value); 
        setSubmitted(false); 
    }; 

    // Handling the password change 
    const handlePassword = (e) => { 
        const value = e.target.value;
        setPassword(value); 
        setSubmitted(false);
        setPasswordError(value.length >=8 ? false :true);
       
    }; 
    const handlePasswordFocus = () => {
        setPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setPasswordFocused(false);
    };

    // Handling the confirm password change 
    const handleConfirmPassword = (e) => { 
        const value = e.target.value;
        setConfirmPassword(value); 
        setSubmitted(false);
        setConfirmPasswordError(value!==password)
    }
    //#endregion

    //#region Handling the form submission 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
          setError(true);
          return;
        }
        if (passwordError || confirmPasswordError) {
          // If there's a password or confirm password validation error, don't submit the form
          return;
        }
        try {
            const userExists = await checkUserExists(email);
            if (userExists) {
                setUserExist(true);
                return;
            }
            // Call registerUser function to make POST request
            await registerUser({ name, email, password });
      
            // Set registered state to true
            setSubmitted(true);
            setError(false);
      
            // Optionally, you can store an identifier or token in localStorage to indicate registration
            
      
            // Navigate to login page (example using react-router-dom)
            navigate('/login');
          } catch (error) {
            console.error('Registration failed:', error);
        }
    };
    //#endregion

    //#region Showing success message 
    const successMessage = () => { 
        return ( 
            <div 
                className="registration-success"
                style={{ 
                    display: submitted ? "" : "none", 
                }} 
            > 
                <h3>User {name} successfully registered!!</h3> 
            </div> 
        ); 
    }; 
    //#endregion

    //#region Showing error message if error is true 
    const errorMessage = () => { 
        return ( 
            <div 
                className="registration-error"
                style={{ 
                    display: error ? "" : "none", 
                }} 
            > 
                <h3>Please enter all the required fields</h3> 
            </div> 
        ); 
    }; 
    //#endregion

    const userExistMessage=()=>{
            return ( 
                <div 
                    className="registration-error"
                    style={{ 
                        display: userExist ? "" : "none", 
                    }} 
                > 
                    <h3>User Already exist!Please <span onClick={() => navigate('/login')} 
                    style={{ cursor: 'pointer', color: 'blue' }}>login</span></h3> 
                </div> 
            );  
    };

    return ( 
        <div className='reg-form'>
        <div className="registration-form"> 
            <div> 
                <h1>User Registration</h1> 
            </div> 
            {/* Calling to the methods */} 
            <div className="registration-messages"> 
                {errorMessage()} 
                {successMessage()} 
                {userExistMessage()}
            </div> 
            <form onSubmit={handleSubmit}> 
                {/* Labels and inputs for form data */} 
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
                    onBlur={handlePasswordBlur}  // Check validation on blur
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
                
                {/* New Confirm Password Field */}
                <label className="registration-label">Confirm Password *</label> 
                <input 
                    onChange={handleConfirmPassword} 
                    className="registration-input"
                    value={confirmPassword} 
                    type="password"
                    placeholder="Confirm your password"
                />
                {confirmPasswordError &&(
                     <div className="registration-confirm-password-error">
                        <p>Passwords do not match</p>
                    </div>
                )} {/* Display confirm password validation error below the confirm password input */}
                
                <button className="registration-bt" type="submit"> 
                    Submit 
                </button> 
            </form> 
        </div>
        </div>
    ); 
}
