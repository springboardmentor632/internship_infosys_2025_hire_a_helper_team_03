// ============================================
// COMPLETE FIXED authController.js (Backend)
// ============================================

const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const { generateOTP, sendOTPEmail, sendPasswordResetOTPEmail } = require('../utils/emailService');
const { pendingRegistrations } = require('../utils/tempStorage');

// ========== REGISTRATION & AUTHENTICATION ==========

// Register user (stores in temporary storage until OTP verification)
exports.register = async (req, res) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const { firstName, lastName, phone, email, password } = req.body;
        
        if (!firstName || !lastName || !phone || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        if (pendingRegistrations.has(email)) {
            pendingRegistrations.delete(email);
            console.log(`Removed old pending registration for: ${email}`);
        }
        
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        const hashedPassword = await bcrypt.hash(password, 10);
        
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

// Send OTP to email
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        const pendingUser = pendingRegistrations.get(email);
        if (pendingUser) {
            const otp = generateOTP();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
            
            pendingUser.otp = otp;
            pendingUser.otpExpiry = otpExpiry;
            pendingRegistrations.set(email, pendingUser);
            
            await sendOTPEmail(email, otp, pendingUser.firstName);
            
            return res.status(200).json({ 
                message: 'New OTP sent successfully to your email',
                email: email
            });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No registration found for this email. Please register first.' });
        }
        
        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }
        
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        
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
        
        const pendingUser = pendingRegistrations.get(email);
        
        if (pendingUser) {
            if (new Date() > pendingUser.otpExpiry) {
                return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
            }
            
            if (pendingUser.otp !== otp) {
                return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
            }
            
            const newUser = new User({
                firstName: pendingUser.firstName,
                lastName: pendingUser.lastName,
                phone: pendingUser.phone,
                email: pendingUser.email,
                password: pendingUser.password,
                isVerified: true,
                otp: null,
                otpExpiry: null
            });
            
            await newUser.save();
            pendingRegistrations.delete(email);
            
            console.log(`User verified and created in database: ${email}`);
            
            return res.status(200).json({ 
                message: 'Email verified successfully! Your account has been created. You can now login.',
                verified: true
            });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No registration found. Please register first.' });
        }
        
        if (user.isVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }
        
        if (!user.otp) {
            return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
        }
        
        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }
        
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }
        
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

// Login
exports.login = async (req, res) => {
    try {
        console.log('=== LOGIN ATTEMPT STARTED ===');
        
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const pendingUser = pendingRegistrations.get(email);
        if (pendingUser) {
            return res.status(403).json({ 
                message: 'Please verify your email before logging in. Check your email for the OTP.',
                needsVerification: true,
                email: email,
                isPending: true
            });
        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
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
        
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );
        
        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                isVerified: user.isVerified,
                profilePicture: user.profilePicture || null
            }
        });
        
        console.log('=== LOGIN SUCCESSFUL ===');
    } catch (err) {
        console.error('=== LOGIN ERROR ===', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// ========== PASSWORD RESET ==========

// Send Password Reset OTP
exports.sendResetPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with this email' });
        }
        
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email first before resetting password' });
        }
        
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpiry = otpExpiry;
        await user.save();
        
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
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (!user.resetPasswordOTP) {
            return res.status(400).json({ message: 'No reset code found. Please request a new one.' });
        }
        
        if (new Date() > user.resetPasswordOTPExpiry) {
            return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
        }
        
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
        
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (!user.resetPasswordOTP) {
            return res.status(400).json({ message: 'No reset code found. Please request a new one.' });
        }
        
        if (new Date() > user.resetPasswordOTPExpiry) {
            return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
        }
        
        if (user.resetPasswordOTP !== otp) {
            return res.status(400).json({ message: 'Invalid reset code. Please try again.' });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
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

// ========== PROFILE FUNCTIONS WITH LOCATION FIX ==========

// ✅ Get user profile - NOW INCLUDES LOCATION
exports.getProfile = async (req, res) => {
    try {
        console.log('🔥 GET PROFILE CONTROLLER HIT!');
        console.log('User from middleware:', req.user);
        
        const user = await User.findById(req.user._id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            username: user.email.split('@')[0],
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            bio: user.bio || '',
            skills: user.skills || [],
            profilePicture: user.profilePicture || null,
            location: user.location || '', // ✅ NOW RETURNS LOCATION
            rating: user.rating || 0,
            isVerified: user.isVerified
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Upload profile image
exports.uploadProfileImage = async (req, res) => {
    try {
        console.log('🔥 Upload Profile Image Controller');
        console.log('Request file:', req.file);
        
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const imageUrl = req.file.path;
        console.log('🖼️ Image URL:', imageUrl);

        user.profilePicture = imageUrl;
        await user.save();

        res.json({
            message: 'Profile image uploaded successfully',
            imageUrl: imageUrl,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePicture: imageUrl
            }
        });

    } catch (error) {
        console.error('Profile image upload error:', error);
        res.status(500).json({ 
            message: 'Failed to upload profile image',
            error: error.message 
        });
    }
};

// ✅ Update user profile - NOW HANDLES LOCATION
exports.updateProfile = async (req, res) => {
    try {
        console.log('🔥 UPDATE PROFILE CONTROLLER HIT!');
        console.log('Request body:', req.body);
        
        const { firstName, lastName, bio, skills, phone, location } = req.body; // ✅ Added location
        
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Update fields if provided
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (bio !== undefined) user.bio = bio;
        if (skills !== undefined) user.skills = skills;
        if (phone !== undefined) user.phone = phone;
        if (location !== undefined) user.location = location; // ✅ NOW UPDATES LOCATION
        
        await user.save();
        
        console.log('✅ Profile updated successfully for:', user.email);
        console.log('✅ Location saved:', user.location);
        
        const updatedUser = await User.findById(user._id).select('-password');
        res.json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                name: `${updatedUser.firstName} ${updatedUser.lastName}`,
                username: updatedUser.email.split('@')[0],
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phone: updatedUser.phone,
                bio: updatedUser.bio || '',
                skills: updatedUser.skills || [],
                profilePicture: updatedUser.profilePicture || null,
                location: updatedUser.location || '', // ✅ NOW RETURNS LOCATION
                rating: updatedUser.rating || 0
            }
        });
    } catch (error) {
        console.error('❌ Update profile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};