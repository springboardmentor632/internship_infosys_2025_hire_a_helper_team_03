// Auth Controller -  authentication services
const registrationService = require('../services/registrationService');
const loginService = require('../services/loginService');
const passwordResetService = require('../services/passwordResetService');
const profileService = require('../services/profileService');

// REGISTRATION & AUTHENTICATION 

//  * Register user - creates pending registration and sends OTP
exports.register = async (req, res) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const result = await registrationService.createPendingRegistration(req.body);
        
        res.status(201).json(result);
    } catch (err) {
        console.error('Registration error:', err);
        const status = err.status || 500;
        const message = err.message || 'Server error';
        res.status(status).json({ message });
    }
};

//  * Send or resend OTP to user email
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        const result = await registrationService.resendOTP(email);
        
        res.status(200).json(result);
    } catch (err) {
        console.error('Send OTP error:', err);
        const status = err.status || 500;
        const message = err.message || 'Failed to send OTP. Please try again.';
        res.status(status).json({ message });
    }
};

//  * Verify OTP and create user in database
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const result = await registrationService.verifyOTPAndCreateUser(email, otp);
        
        res.status(200).json(result);
    } catch (err) {
        console.error('Verify OTP error:', err);
        const status = err.status || 500;
        const message = err.message || 'Failed to verify OTP. Please try again.';
        res.status(status).json({ message });
    }
};

//  * Login user and return JWT token
exports.login = async (req, res) => {
    try {
        console.log('=== LOGIN ATTEMPT STARTED ===');
        
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const { email, password } = req.body;
        
        const result = await loginService.authenticateUser(email, password);
        
        res.json(result);
        
        console.log('=== LOGIN SUCCESSFUL ===');
    } catch (err) {
        console.error('=== LOGIN ERROR ===', err);
        const status = err.status || 500;
        const message = err.message || 'Server error';
        const response = { message };
        
        // Include additional fields for verification errors
        if (err.needsVerification) {
            response.needsVerification = err.needsVerification;
            response.email = err.email;
            if (err.isPending) response.isPending = err.isPending;
        }
        
        res.status(status).json(response);
    }
};

// PASSWORD RESET

//  * Send password reset OTP to user email
exports.sendResetPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        const result = await passwordResetService.sendResetOTP(email);
        
        res.status(200).json(result);
    } catch (err) {
        console.error('Send reset password OTP error:', err);
        const status = err.status || 500;
        const message = err.message || 'Failed to send reset code. Please try again.';
        res.status(status).json({ message });
    }
};

//  * Verify password reset OTP
exports.verifyResetPasswordOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const result = await passwordResetService.verifyResetOTP(email, otp);
        
        res.status(200).json(result);
    } catch (err) {
        console.error('Verify reset password OTP error:', err);
        const status = err.status || 500;
        const message = err.message || 'Failed to verify reset code. Please try again.';
        res.status(status).json({ message });
    }
};

//  * Reset user password with verified OTP
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        
        const result = await passwordResetService.resetUserPassword(email, otp, newPassword);
        
        res.status(200).json(result);
    } catch (err) {
        console.error('Reset password error:', err);
        const status = err.status || 500;
        const message = err.message || 'Failed to reset password. Please try again.';
        res.status(status).json({ message });
    }
};

// PROFILE OPERATIONS

//  * Get user profile - includes location
exports.getProfile = async (req, res) => {
    try {
        console.log('🔥 GET PROFILE CONTROLLER HIT!');
        console.log('User from middleware:', req.user);
        
        const profile = await profileService.getUserProfile(req.user._id);
        
        res.json(profile);
    } catch (error) {
        console.error('Get profile error:', error);
        const status = error.status || 500;
        const message = error.message || 'Server error';
        res.status(status).json({ message, error: error.message });
    }
};

//  * Update user profile - handles location
exports.updateProfile = async (req, res) => {
    try {
        console.log('🔥 UPDATE PROFILE CONTROLLER HIT!');
        console.log('Request body:', req.body);
        
        const result = await profileService.updateUserProfile(req.user._id, req.body);
        
        res.json(result);
    } catch (error) {
        console.error('❌ Update profile error:', error);
        const status = error.status || 500;
        const message = error.message || 'Server error';
        res.status(status).json({ message, error: error.message });
    }
};

//  * Upload profile image
exports.uploadProfileImage = async (req, res) => {
    try {
        console.log('🔥 Upload Profile Image Controller');
        console.log('Request file:', req.file);
        
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const imageUrl = req.file.path;
        console.log('🖼️ Image URL:', imageUrl);

        const result = await profileService.updateProfilePicture(req.user._id, imageUrl);

        res.json(result);

    } catch (error) {
        console.error('Profile image upload error:', error);
        const status = error.status || 500;
        const message = error.message || 'Failed to upload profile image';
        res.status(status).json({ message, error: error.message });
    }
};