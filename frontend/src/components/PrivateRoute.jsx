// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;