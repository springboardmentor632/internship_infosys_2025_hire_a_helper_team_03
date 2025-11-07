import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Feed from './Pages/Feed';
import MyTask from './Pages/MyTask';
import PostNewTask from './Pages/PostNewTask';
import SignUpPage from './Pages/signup';
import LoginPage from './Pages/login';
import Home from './Pages/Home';  
import MyRequest from './Pages/MyRequest';
import Requests from './Pages/RequestPage';
import Settings from './Pages/SettingsPage';
import Notifications from './Pages/NotificationsPage';
import OTPVerification from './Pages/OTPVerification';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Loader from './Components/Loader';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';

// Pages

function AppContent() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    // Show loader on route change
    setLoading(true);
    
    // Hide loader after 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <Routes>
        {/* Public Routes - Redirect to dashboard if logged in */}
        <Route path="/" element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <Home />
        } />
        <Route path="/signup" element={
          <PublicRoute><SignUpPage /></PublicRoute>
        } />
        <Route path="/signin" element={
          <PublicRoute><LoginPage /></PublicRoute>
        } />
        <Route path="/otp-verification" element={
          <PublicRoute><OTPVerification /></PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute><ForgotPassword /></PublicRoute>
        } />
        <Route path="/reset-password" element={
          <PublicRoute><ResetPassword /></PublicRoute>
        } />

        {/* Protected Routes - Require authentication */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/feedPage" element={
          <ProtectedRoute><Feed /></ProtectedRoute>
        } />
        <Route path="/mytasks" element={
          <ProtectedRoute><MyTask /></ProtectedRoute>
        } />
        <Route path="/posttask" element={
          <ProtectedRoute><PostNewTask /></ProtectedRoute>
        } />
        <Route path="/myrequests" element={
          <ProtectedRoute><MyRequest /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />
        <Route path="/requests" element={
          <ProtectedRoute><Requests /></ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute><Notifications /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;