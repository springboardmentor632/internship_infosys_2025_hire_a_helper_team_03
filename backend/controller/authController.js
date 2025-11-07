const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP, sendOTPEmail } = require('../utils/emailService');

// Register user (creates account but not verified)
exports.register = async (req, res) => {
    try {
        // Simulate loader delay (for frontend loader UX)
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const { firstName, lastName, phone, email, password } = req.body;
        
        if (!firstName || !lastName || !phone || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        
        // Hash password and create user (unverified)
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            firstName, 
            lastName, 
            phone, 
            email, 
            password: hashedPassword,
            isVerified: false // Account created but not verified
        });
        await user.save();
        
        res.status(201).json({ 
            message: 'Registration successful! Please verify your email.',
            email: user.email,
            firstName: user.firstName
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Send OTP to email
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if already verified
        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }
        
        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        
        // Save OTP to user
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        
        // Send OTP email
        await sendOTPEmail(email, otp, user.firstName);
        
        res.status(200).json({ 
            message: 'OTP sent successfully to your email',
            email: email
        });
    } catch (err) {
        console.error('Send OTP error:', err);
        res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if already verified
        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }
        
        // Check if OTP exists
        if (!user.otp) {
            return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
        }
        
        // Check if OTP is expired
        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }
        
        // Verify OTP
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }
        
        // Mark as verified and clear OTP
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        
        res.status(200).json({ 
            message: 'Email verified successfully! You can now login.',
            verified: true
        });
    } catch (err) {
        console.error('Verify OTP error:', err);
        res.status(500).json({ message: 'Failed to verify OTP. Please try again.' });
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
        
        // Check if email is verified
        if (!user.isVerified) {
            return res.status(403).json({ 
                message: 'Please verify your email before logging in',
                needsVerification: true,
                email: user.email
            });
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
                email: user.email,
                isVerified: user.isVerified
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
