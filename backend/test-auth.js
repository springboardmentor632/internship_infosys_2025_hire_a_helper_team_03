const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./model/User');
require('dotenv').config();

async function testAuth() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Test user data
        const testUser = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test@test.com',
            phone: '1234567890',
            password: 'testpassword'
        };

        // Clear any existing test user
        await User.deleteOne({ email: testUser.email });

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testUser.password, salt);
        
        const newUser = new User({
            ...testUser,
            password: hashedPassword
        });

        await newUser.save();
        console.log('Test user created successfully');

        // Try to find the user
        const foundUser = await User.findOne({ email: testUser.email });
        console.log('Found user:', foundUser ? 'Yes' : 'No');

        // Test password comparison
        if (foundUser) {
            const isMatch = await bcrypt.compare(testUser.password, foundUser.password);
            console.log('Password match:', isMatch);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

testAuth();