// ============================================
// User Model Schema (User.js)
// ============================================

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    skills: {
        type: [String],
        default: []
    },
    profilePicture: {
        type: String,
        default: null
    },
    location: {  // ✅ LOCATION FIELD - REQUIRED FOR THE FIX
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    resetPasswordOTP: {
        type: String,
        default: null
    },
    resetPasswordOTPExpiry: {
        type: Date,
        default: null
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Index for faster email lookups
userSchema.index({ email: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        bio: this.bio,
        skills: this.skills,
        profilePicture: this.profilePicture,
        location: this.location, // ✅ Include location
        rating: this.rating,
        isVerified: this.isVerified,
        createdAt: this.createdAt
    };
};

module.exports = mongoose.model('User', userSchema);