// Registration Service - Handles user registration and OTP verification

const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { generateOTP, sendOTPEmail } = require('../utils/emailService');
const { pendingRegistrations } = require('../utils/tempStorage');

//  * Create pending registration and send OTP
exports.createPendingRegistration = async (userData) => {
    const { firstName, lastName, phone, email, password } = userData;
    
    // Validate required fields
    if (!firstName || !lastName || !phone || !email || !password) {
        throw { status: 400, message: 'All fields are required' };
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw { status: 400, message: 'User already exists with this email' };
    }

    // Remove old pending registration if exists
    if (pendingRegistrations.has(email)) {
        pendingRegistrations.delete(email);
        console.log(`Removed old pending registration for: ${email}`);
    }
    
    // Generate OTP and hash password
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Store in temporary storage
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
    
    // Send OTP email
    await sendOTPEmail(email, otp, firstName);
    
    return {
        message: 'Registration initiated! Please verify your email with the OTP sent.',
        email,
        firstName
    };
};

//  * Resend OTP for pending or unverified user
exports.resendOTP = async (email) => {
    if (!email) {
        throw { status: 400, message: 'Email is required' };
    }
    
    // Check if pending registration exists
    const pendingUser = pendingRegistrations.get(email);
    if (pendingUser) {
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        
        pendingUser.otp = otp;
        pendingUser.otpExpiry = otpExpiry;
        pendingRegistrations.set(email, pendingUser);
        
        await sendOTPEmail(email, otp, pendingUser.firstName);
        
        return { 
            message: 'New OTP sent successfully to your email',
            email
        };
    }
    
    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
        throw { status: 404, message: 'No registration found for this email. Please register first.' };
    }
    
    if (user.isVerified) {
        throw { status: 400, message: 'Email already verified' };
    }
    
    // Generate new OTP for unverified user
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    
    await sendOTPEmail(email, otp, user.firstName);
    
    return { 
        message: 'OTP sent successfully to your email',
        email
    };
};

//  * Verify OTP and create user in database
exports.verifyOTPAndCreateUser = async (email, otp) => {
    if (!email || !otp) {
        throw { status: 400, message: 'Email and OTP are required' };
    }
    
    // Check pending registrations first
    const pendingUser = pendingRegistrations.get(email);
    
    if (pendingUser) {
        // Verify OTP expiry
        if (new Date() > pendingUser.otpExpiry) {
            throw { status: 400, message: 'OTP has expired. Please request a new one.' };
        }
        
        // Verify OTP match
        if (pendingUser.otp !== otp) {
            throw { status: 400, message: 'Invalid OTP. Please try again.' };
        }
        
        // Create new user in database
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
        
        return { 
            message: 'Email verified successfully! Your account has been created. You can now login.',
            verified: true
        };
    }
    
    // Check for existing user in database
    const user = await User.findOne({ email });
    if (!user) {
        throw { status: 404, message: 'No registration found. Please register first.' };
    }
    
    if (user.isVerified) {
        throw { status: 400, message: 'Email already verified' };
    }
    
    if (!user.otp) {
        throw { status: 400, message: 'No OTP found. Please request a new one.' };
    }
    
    // Verify OTP expiry
    if (new Date() > user.otpExpiry) {
        throw { status: 400, message: 'OTP has expired. Please request a new one.' };
    }
    
    // Verify OTP match
    if (user.otp !== otp) {
        throw { status: 400, message: 'Invalid OTP. Please try again.' };
    }
    
    // Mark user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    
    return { 
        message: 'Email verified successfully! You can now login.',
        verified: true
    };
};
