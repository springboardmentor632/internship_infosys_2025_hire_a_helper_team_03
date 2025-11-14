// Profile Service - Handles user profile operations
const User = require('../model/User');

//  * Get user profile by ID
exports.getUserProfile = async (userId) => {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    
    return {
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
        location: user.location || '',
        rating: user.rating || 0,
        isVerified: user.isVerified
    };
};

//  * Update user profile
exports.updateUserProfile = async (userId, profileData) => {
    const { firstName, lastName, bio, skills, phone, location } = profileData;
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    
    // Update fields if provided
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;
    if (skills !== undefined) user.skills = skills;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    
    // Save changes
    await user.save();
    
    console.log('✅ Profile updated successfully for:', user.email);
    console.log('✅ Location saved:', user.location);
    
    // Return updated profile
    const updatedUser = await User.findById(user._id).select('-password');
    
    return {
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
            location: updatedUser.location || '',
            rating: updatedUser.rating || 0
        }
    };
};

//  * Update user profile picture

exports.updateProfilePicture = async (userId, imageUrl) => {
    if (!imageUrl) {
        throw { status: 400, message: 'No image URL provided' };
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    
    // Update profile picture
    user.profilePicture = imageUrl;
    await user.save();
    
    console.log('🖼️ Profile picture updated for:', user.email);
    
    return {
        message: 'Profile image uploaded successfully',
        imageUrl,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePicture: imageUrl
        }
    };
};
