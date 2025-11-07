import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * PublicRoute Component
 * Redirects to dashboard if user is already logged in
 * Used for login/signup pages
 */
const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const token = localStorage.getItem('token');

  // If already logged in, redirect to dashboard
  if (isLoggedIn && token) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is not logged in, show the public page
  return children;
};

export default PublicRoute;
