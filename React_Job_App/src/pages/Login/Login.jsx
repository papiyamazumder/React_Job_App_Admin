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

  const handleSubmit = async (e, adminLogin) => {
    e.preventDefault();

    try {
      const isValidLogin = await validateLogin(email, password);
      if (isValidLogin) {
        const userData = await loginUser(email);
        if (userData.role === "user" && !adminLogin) {
          login(email, "user"); 
          navigate("/jobs");
        } else if (userData.role === "admin" && adminLogin) {
          login(email, "admin"); // Pass the admin role to login
          navigate("/admin-dashboard"); // Navigate to admin dashboard for admin
        } else {
          setError("Invalid user role for selected login option.");
        }
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
