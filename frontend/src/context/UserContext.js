// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const isLoggedIn = !!username;

  const logout = () => {
    localStorage.removeItem('username');
    sessionStorage.removeItem('username');
    setUsername('');
  };

  return (
    <UserContext.Provider value={{ username, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);