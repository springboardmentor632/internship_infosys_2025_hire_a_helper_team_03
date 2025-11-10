import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Redirects to login if user is not authenticated
 * Prevents going back to auth pages if already logged in
 */
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const token = localStorage.getItem('token');

  // If not logged in, redirect to home/login
  if (!isLoggedIn || !token) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
