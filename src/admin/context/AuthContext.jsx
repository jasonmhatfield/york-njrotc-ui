import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Function to validate the token
      const validateToken = async (token) => {
        try {
          const response = await fetch('http://localhost:8080/api/validate-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            setIsAuthenticated(true);
            setToken(storedToken);
          } else {
            logout(); // If token is invalid, log the user out
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          logout(); // Log out if there is any error validating the token
        } finally {
          setIsLoading(false); // Set loading to false after validation
        }
      };

      validateToken(storedToken);
    } else {
      setIsLoading(false); // Set loading to false if no token is found
    }
  }, []);

  const login = (newToken) => {
    setIsAuthenticated(true);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
