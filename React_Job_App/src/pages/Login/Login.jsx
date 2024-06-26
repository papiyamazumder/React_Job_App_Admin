// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin, loginUser } from "../../Api/usersApi";
import { useAuth } from "../../Auth/AuthProvider";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

<<<<<<< HEAD
  const handleSubmit = async (e, adminLogin) => {
=======

  const handleSubmit = async (e) => {
>>>>>>> 96b60eb894d7ce8b62307733f09214dd9046fb5a
    e.preventDefault();

    try {
      const isValidLogin = await validateLogin(email, password);
<<<<<<< HEAD
        if (isValidLogin) {
          login(email);
          navigate('/jobs'); // Redirect to jobs page after successful login
=======
      if (isValidLogin) {
        const userData = await loginUser(email);
        if (userData.role === "user" && !adminLogin) {
          login(userData);
          navigate("/jobs"); // Navigate to jobs page for regular user
        } else if (userData.role === "admin" && adminLogin) {
          login(userData);
<<<<<<< HEAD
          navigate("/admin-dashboard"); // Navigate to admin dashboard for admin
=======
          navigate("/admin-dashboard");
>>>>>>> 2a57838b08f75a557d9c643a51d874cd43c381dc
>>>>>>> 96b60eb894d7ce8b62307733f09214dd9046fb5a
        } else {
          setError("Invalid user role for selected login option.");
        }
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    }
  };

  const handleSignUp = () => {
    navigate("/registration");
  };

  const handleLoginAsAdmin = async () => {
    setIsAdmin(true);
    await handleSubmit({ preventDefault: () => {} }, true); // Pass true to indicate admin login
  };

  const handleLoginAsUser = async () => {
    setIsAdmin(false);
    await handleSubmit({ preventDefault: () => {} }, false); // Pass false to indicate user login
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
          <form onSubmit={(e) => handleSubmit(e, isAdmin)}>
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
            <div className="login-roles">
              <button
                type="button"
                className={`login-button ${isAdmin ? "active" : ""}`}
                onClick={handleLoginAsAdmin}
              >
                Login as Admin
              </button>
              <button
                type="button"
                className={`login-button ${!isAdmin ? "active" : ""}`}
                onClick={handleLoginAsUser}
              >
                Login as User
              </button>
            </div>
          </form>
          <p className="login-signup">
            New User?{" "}
            <span className="login-signup-link" onClick={handleSignUp}>
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
