const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { 
  register, 
  login, 
  sendOTP, 
  verifyOTP, 
  sendResetPasswordOTP, 
  verifyResetPasswordOTP, 
  resetPassword,
  getProfile,
  updateProfile
} = require('../controller/authController');

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('🔐 Auth Middleware - Token received:', !!token);
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔐 Token decoded, userId:', decoded.userId);
    
    // Note: Your login uses "userId" in the token, not "id"
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('🔐 User not found for userId:', decoded.userId);
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('🔐 User authenticated:', user.email);
    req.user = user;
    next();
  } catch (error) {
    console.error('🔐 Auth middleware error:', error.message);
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

// Register endpoint - creates account (unverified)
router.post('/register', (req, res, next) => {
  console.log('🔥 REGISTER ROUTE HIT!');
  next();
}, register);

// Send OTP endpoint
router.post('/send-otp', (req, res, next) => {
  console.log('🔥 SEND-OTP ROUTE HIT!');
  next();
}, sendOTP);

// Verify OTP endpoint
router.post('/verify-otp', (req, res, next) => {
  console.log('🔥 VERIFY-OTP ROUTE HIT!');
  next();
}, verifyOTP);

// Login endpoint - requires verified email
router.post('/login', (req, res, next) => {
  console.log('🔥 LOGIN ROUTE HIT!');
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  next();
}, login);

// Forgot password - send reset OTP
router.post('/forgot-password', (req, res, next) => {
  console.log('🔥 FORGOT-PASSWORD ROUTE HIT!');
  next();
}, sendResetPasswordOTP);

// Verify reset password OTP
router.post('/verify-reset-otp', (req, res, next) => {
  console.log('🔥 VERIFY-RESET-OTP ROUTE HIT!');
  next();
}, verifyResetPasswordOTP);

// Reset password
router.post('/reset-password', (req, res, next) => {
  console.log('🔥 RESET-PASSWORD ROUTE HIT!');
  next();
}, resetPassword);

// ========== Profile Routes ==========
// Get user profile
router.get('/profile', authMiddleware, (req, res, next) => {
  console.log('🔥 GET PROFILE ROUTE HIT!');
  next();
}, getProfile);

// Update user profile
router.put('/profile', authMiddleware, (req, res, next) => {
  console.log('🔥 UPDATE PROFILE ROUTE HIT!');
  next();
}, updateProfile);

// Debug endpoint to check users (remove in production)
router.get('/debug/users', async (req, res) => {
  try {
    console.log('🔥 DEBUG USERS ROUTE HIT!');
    const users = await User.find({});
    const sanitizedUsers = users.map(user => ({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      passwordLength: user.password ? user.password.length : 0,
      isVerified: user.isVerified
    }));
    res.json(sanitizedUsers);
  } catch (err) {
    console.error('Debug users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Debug endpoint to test password (remove in production)
router.post('/debug/check-password', async (req, res) => {
  try {
    console.log('🔥 DEBUG CHECK-PASSWORD ROUTE HIT!');
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json({ 
        found: false, 
        message: 'User not found' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    res.json({
      found: true,
      passwordMatch: isMatch,
      storedPasswordLength: user.password.length,
      providedPassword: password,
      isVerified: user.isVerified
    });
  } catch (err) {
    console.error('Password check error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;