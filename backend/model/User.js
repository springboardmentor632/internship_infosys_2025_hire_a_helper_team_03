const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	phone: {
		type: String,
		required: true,
		trim: true
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
	otp: {
		type: String,
		default: null
	},
	otpExpiry: {
		type: Date,
		default: null
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	resetPasswordOTP: {
		type: String,
		default: null
	},
	resetPasswordOTPExpiry: {
		type: Date,
		default: null
	},
	// ========== NEW PROFILE FIELDS ==========
	bio: {
		type: String,
		default: '',
		trim: true
	},
	skills: {
		type: [String],
		default: []
	},
	profilePicture: {
		type: String,
		default: null
	},
	rating: {
		type: Number,
		default: 0,
		min: 0,
		max: 5
	}
}, { timestamps: true });

// Add pre-save middleware
userSchema.pre('save', function(next) {
    console.log('Attempting to save user:', {
        id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        bio: this.bio,
        skills: this.skills
    });
    next();
});

// Add post-save middleware
userSchema.post('save', function(doc) {
    console.log('User saved successfully:', {
        id: doc._id,
        email: doc.email,
        firstName: doc.firstName,
        lastName: doc.lastName,
        bio: doc.bio,
        skills: doc.skills
    });
});

module.exports = mongoose.model('User', userSchema);