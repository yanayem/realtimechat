import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user has a token in their browser storage
  const token = localStorage.getItem('token');
  
  // If no token exists, send them back to the Login page ("/")
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, show the requested page (Home or Chat)
  return children;
};

export default ProtectedRoute;