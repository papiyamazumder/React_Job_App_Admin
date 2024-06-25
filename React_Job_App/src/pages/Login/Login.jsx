import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {validateLogin,loginUser} from '../../Api/usersApi';
import { AuthProvider,useAuth } from '../../Auth/AuthProvider';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValidLogin = await validateLogin(email, password);
        if (isValidLogin) {
          login();
          navigate('/jobs'); // Redirect to jobs page after successful login
        } else {
          setError('Invalid email or password. Please try again.');
        }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.'); // Handle login error
    }
  };

  const handleSignUp = () => {
    navigate('/registration');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-gif">
          <img
            src="https://i.pinimg.com/originals/75/95/2d/75952ddbecd4743baf83236395b20541.gif"
            alt="Job Search"
          />
        </div>
        <div className="login-form">
          <h2>Login</h2>
          {error && <div className="login-error-alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="login-signup">
              New User?<span> </span>
              <span
                href="/registration"
                className="login-signup-link"
                onClick={handleSignUp}
              >
                Create Account
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
