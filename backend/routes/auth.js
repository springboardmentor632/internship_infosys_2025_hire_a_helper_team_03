const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { register, login, sendOTP, verifyOTP, sendResetPasswordOTP, verifyResetPasswordOTP, resetPassword } = require('../controller/authController');

// Register endpoint - creates account (unverified)
router.post('/register', register);

// Send OTP endpoint
router.post('/send-otp', sendOTP);

// Verify OTP endpoint
router.post('/verify-otp', verifyOTP);

// Login endpoint - requires verified email
router.post('/login', login);

// Forgot password - send reset OTP
router.post('/forgot-password', sendResetPasswordOTP);

// Verify reset password OTP
router.post('/verify-reset-otp', verifyResetPasswordOTP);

// Reset password
router.post('/reset-password', resetPassword);

// Debug endpoint to check users (remove in production)
router.get('/debug/users', async (req, res) => {
  try {
    const users = await User.find({});
    const sanitizedUsers = users.map(user => ({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      passwordLength: user.password ? user.password.length : 0
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
    });
  } catch (err) {
    console.error('Password check error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;