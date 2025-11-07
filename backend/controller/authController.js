
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../config/email');
const { generateOTP, storeOTP, verifyOTP } = require('../utils/otpStore');

// Step 1: Send OTP for registration
exports.sendRegistrationOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Generate and store OTP
        const otp = generateOTP();
        storeOTP(email, otp, 10); // 10 minutes expiry
        
        // Send OTP via email
        await sendOTPEmail(email, otp);
        
        res.status(200).json({ 
            message: 'OTP sent successfully to your email',
            email 
        });
    } catch (err) {
        console.error('Error sending OTP:', err);
        res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }
};

// Step 2: Verify OTP and complete registration
exports.register = async (req, res) => {
    try {
        // Simulate loader delay (for frontend loader UX)
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const { firstName, lastName, phone, email, password, otp } = req.body;
        
        if (!firstName || !lastName || !phone || !email || !password || !otp) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Verify OTP
        const otpVerification = verifyOTP(email, otp);
        if (!otpVerification.valid) {
            return res.status(400).json({ message: otpVerification.message });
        }
        
        // Check if user already exists (double-check)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            firstName, 
            lastName, 
            phone, 
            email, 
            password: hashedPassword 
        });
        await user.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Generate and store new OTP
        const otp = generateOTP();
        storeOTP(email, otp, 10);
        
        // Send OTP via email
        await sendOTPEmail(email, otp);
        
        res.status(200).json({ 
            message: 'New OTP sent successfully to your email' 
        });
    } catch (err) {
        console.error('Error resending OTP:', err);
        res.status(500).json({ message: 'Failed to resend OTP. Please try again.' });
    }
};

// Forgot Password: Send OTP
exports.sendForgotPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with this email' });
        }
        
        // Generate and store OTP
        const otp = generateOTP();
        storeOTP(email, otp, 10); // 10 minutes expiry
        
        // Send OTP via email
        await sendOTPEmail(email, otp);
        
        res.status(200).json({ 
            message: 'OTP sent successfully to your email',
            email 
        });
    } catch (err) {
        console.error('Error sending forgot password OTP:', err);
        res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }
};

// Forgot Password: Verify OTP and Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Verify OTP
        const otpVerification = verifyOTP(email, otp);
        if (!otpVerification.valid) {
            return res.status(400).json({ message: otpVerification.message });
        }
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error('Password reset error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        // Simulate loader delay (for frontend loader UX)
        await new Promise(resolve => setTimeout(resolve, 1200));
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
