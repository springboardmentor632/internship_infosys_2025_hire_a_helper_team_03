const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP, sendOTPEmail, sendPasswordResetOTPEmail } = require('../utils/emailService');
const { pendingRegistrations } = require('../utils/tempStorage');

// Register user (stores in temporary storage until OTP verification)
exports.register = async (req, res) => {
    try {
        // Simulate loader delay (for frontend loader UX)
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const { firstName, lastName, phone, email, password } = req.body;
        
        if (!firstName || !lastName || !phone || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Check if user already exists in database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Check if email is already in pending registrations
        if (pendingRegistrations.has(email)) {
            // User tried to register again without verifying
            // Delete old pending registration and create new one
            pendingRegistrations.delete(email);
            console.log(`Removed old pending registration for: ${email}`);
        }
        
        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Store in temporary storage (NOT in database yet)
        pendingRegistrations.set(email, {
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword,
            otp,
            otpExpiry,
            createdAt: new Date()
        });

        console.log(`Pending registration created for: ${email}`);
        console.log(`Total pending registrations: ${pendingRegistrations.size}`);
        
        // Send OTP email immediately
        await sendOTPEmail(email, otp, firstName);
        
        res.status(201).json({ 
            message: 'Registration initiated! Please verify your email with the OTP sent.',
            email: email,
            firstName: firstName
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Send OTP to email (for already registered but unverified users, or resend)
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Check if email is in pending registrations
        const pendingUser = pendingRegistrations.get(email);
        if (pendingUser) {
            // Resend OTP for pending registration
            const otp = generateOTP();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
            
            // Update OTP in temporary storage
            pendingUser.otp = otp;
            pendingUser.otpExpiry = otpExpiry;
            pendingRegistrations.set(email, pendingUser);
            
            // Send OTP email
            await sendOTPEmail(email, otp, pendingUser.firstName);
            
            return res.status(200).json({ 
                message: 'New OTP sent successfully to your email',
                email: email
            });
        }
        
        // Check if user exists in database (for already registered users)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No registration found for this email. Please register first.' });
        }
        
        // Check if already verified
        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }
        
        // Generate OTP for existing unverified user
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

// Verify OTP and create user in database
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }
        
        // First check if email is in pending registrations
        const pendingUser = pendingRegistrations.get(email);
        
        if (pendingUser) {
            // Verify OTP for pending registration
            
            // Check if OTP is expired
            if (new Date() > pendingUser.otpExpiry) {
                return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
            }
            
            // Verify OTP
            if (pendingUser.otp !== otp) {
                return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
            }
            
            // OTP verified! Now create user in database
            const newUser = new User({
                firstName: pendingUser.firstName,
                lastName: pendingUser.lastName,
                phone: pendingUser.phone,
                email: pendingUser.email,
                password: pendingUser.password, // Already hashed
                isVerified: true, // Mark as verified immediately
                otp: null,
                otpExpiry: null
            });
            
            await newUser.save();
            
            // Remove from pending registrations
            pendingRegistrations.delete(email);
            
            console.log(`User verified and created in database: ${email}`);
            console.log(`Remaining pending registrations: ${pendingRegistrations.size}`);
            
            return res.status(200).json({ 
                message: 'Email verified successfully! Your account has been created. You can now login.',
                verified: true
            });
        }
        
        // If not in pending, check if user exists in database (for old flow compatibility)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No registration found. Please register first.' });
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
        
        // First check if email is in pending registrations (not verified yet)
        const pendingUser = pendingRegistrations.get(email);
        if (pendingUser) {
            // User registered but hasn't verified OTP yet
            return res.status(403).json({ 
                message: 'Please verify your email before logging in. Check your email for the OTP.',
                needsVerification: true,
                email: email,
                isPending: true
            });
        }
        
        // Check if user exists in database
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

// Send Password Reset OTP
exports.sendResetPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with this email' });
        }
        
        // Check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email first before resetting password' });
        }
        
        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        
        // Save reset OTP to user
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpiry = otpExpiry;
        await user.save();
        
        // Send password reset OTP email
        await sendPasswordResetOTPEmail(email, otp, user.firstName);
        
        res.status(200).json({ 
            message: 'Password reset code sent to your email',
            email: email
        });
    } catch (err) {
        console.error('Send reset password OTP error:', err);
        res.status(500).json({ message: 'Failed to send reset code. Please try again.' });
    }
};

// Verify Reset Password OTP
exports.verifyResetPasswordOTP = async (req, res) => {
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
        
        // Check if reset OTP exists
        if (!user.resetPasswordOTP) {
            return res.status(400).json({ message: 'No reset code found. Please request a new one.' });
        }
        
        // Check if OTP is expired
        if (new Date() > user.resetPasswordOTPExpiry) {
            return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
        }
        
        // Verify OTP
        if (user.resetPasswordOTP !== otp) {
            return res.status(400).json({ message: 'Invalid reset code. Please try again.' });
        }
        
        res.status(200).json({ 
            message: 'Reset code verified successfully',
            verified: true
        });
    } catch (err) {
        console.error('Verify reset password OTP error:', err);
        res.status(500).json({ message: 'Failed to verify reset code. Please try again.' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'Email, OTP, and new password are required' });
        }
        
        // Validate password length
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if reset OTP exists
        if (!user.resetPasswordOTP) {
            return res.status(400).json({ message: 'No reset code found. Please request a new one.' });
        }
        
        // Check if OTP is expired
        if (new Date() > user.resetPasswordOTPExpiry) {
            return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
        }
        
        // Verify OTP
        if (user.resetPasswordOTP !== otp) {
            return res.status(400).json({ message: 'Invalid reset code. Please try again.' });
        }
        
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update password and clear reset OTP
        user.password = hashedPassword;
        user.resetPasswordOTP = null;
        user.resetPasswordOTPExpiry = null;
        await user.save();
        
        res.status(200).json({ 
            message: 'Password reset successfully! You can now login with your new password.',
            success: true
        });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ message: 'Failed to reset password. Please try again.' });
    }
};
