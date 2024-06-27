import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState(''); // Add userRole state

  const login = (email, role) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserRole(role); // Set the user role
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setUserRole(''); // Reset the user role
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
