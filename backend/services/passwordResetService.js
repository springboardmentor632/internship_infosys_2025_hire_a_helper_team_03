// Password Reset Service - Handles password reset functionality
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { generateOTP, sendPasswordResetOTPEmail } = require('../utils/emailService');


//   Send password reset OTP to user email

exports.sendResetOTP = async (email) => {
    if (!email) {
        throw { status: 400, message: 'Email is required' };
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw { status: 404, message: 'No account found with this email' };
    }
    
    // Check if user is verified
    if (!user.isVerified) {
        throw { status: 403, message: 'Please verify your email first before resetting password' };
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    // Save OTP to user
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = otpExpiry;
    await user.save();
    
    // Send OTP email
    await sendPasswordResetOTPEmail(email, otp, user.firstName);
    
    return { 
        message: 'Password reset code sent to your email',
        email
    };
};


//   Verify password reset OTP

exports.verifyResetOTP = async (email, otp) => {
    if (!email || !otp) {
        throw { status: 400, message: 'Email and OTP are required' };
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    
    // Check if reset OTP exists
    if (!user.resetPasswordOTP) {
        throw { status: 400, message: 'No reset code found. Please request a new one.' };
    }
    
    // Check if OTP is expired
    if (new Date() > user.resetPasswordOTPExpiry) {
        throw { status: 400, message: 'Reset code has expired. Please request a new one.' };
    }
    
    // Verify OTP
    if (user.resetPasswordOTP !== otp) {
        throw { status: 400, message: 'Invalid reset code. Please try again.' };
    }
    
    return { 
        message: 'Reset code verified successfully',
        verified: true
    };
};


//  * Reset user password with verified OTP

exports.resetUserPassword = async (email, otp, newPassword) => {
    // Validate input
    if (!email || !otp || !newPassword) {
        throw { status: 400, message: 'Email, OTP, and new password are required' };
    }
    
    // Validate password length
    if (newPassword.length < 6) {
        throw { status: 400, message: 'Password must be at least 6 characters long' };
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    
    // Check if reset OTP exists
    if (!user.resetPasswordOTP) {
        throw { status: 400, message: 'No reset code found. Please request a new one.' };
    }
    
    // Check if OTP is expired
    if (new Date() > user.resetPasswordOTPExpiry) {
        throw { status: 400, message: 'Reset code has expired. Please request a new one.' };
    }
    
    // Verify OTP
    if (user.resetPasswordOTP !== otp) {
        throw { status: 400, message: 'Invalid reset code. Please try again.' };
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password and clear reset OTP
    user.password = hashedPassword;
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpiry = null;
    await user.save();
    
    return { 
        message: 'Password reset successfully! You can now login with your new password.',
        success: true
    };
};
