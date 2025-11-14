
// Login Service - Handles user authentication

const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pendingRegistrations } = require('../utils/tempStorage');


//  Authenticate user and generate JWT token

exports.authenticateUser = async (email, password) => {
    // Validate input
    if (!email || !password) {
        throw { status: 400, message: 'All fields are required' };
    }
    
    // Check if user has pending registration
    const pendingUser = pendingRegistrations.get(email);
    if (pendingUser) {
        throw { 
            status: 403, 
            message: 'Please verify your email before logging in. Check your email for the OTP.',
            needsVerification: true,
            email,
            isPending: true
        };
    }
    
    // Find user in database
    const user = await User.findOne({ email });
    
    if (!user) {
        throw { status: 400, message: 'Invalid credentials' };
    }
    
    // Check if email is verified
    if (!user.isVerified) {
        throw { 
            status: 403, 
            message: 'Please verify your email before logging in',
            needsVerification: true,
            email: user.email
        };
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw { status: 400, message: 'Invalid credentials' };
    }
    
    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );
    
    return {
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
    };
};


//   Validate user session
 
exports.validateSession = async (userId) => {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    
    if (!user.isVerified) {
        throw { status: 403, message: 'User email not verified' };
    }
    
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
        profilePicture: user.profilePicture || null
    };
};
