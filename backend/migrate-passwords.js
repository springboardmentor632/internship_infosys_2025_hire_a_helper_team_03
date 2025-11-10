const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./model/User');
require('dotenv').config();

async function migratePasswords() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Get all users
        const users = await User.find({});
        console.log(`Found ${users.length} users to process`);

        // Process each user
        for (const user of users) {
            // Check if password looks like it's already hashed
            if (user.password && user.password.length < 30) { // Unhashed passwords are typically shorter
                console.log(`Processing user: ${user.email}`);
                
                // Hash the existing password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                
                // Update the user's password
                await User.updateOne(
                    { _id: user._id },
                    { $set: { password: hashedPassword } }
                );
                console.log(`Updated password for user: ${user.email}`);
            } else {
                console.log(`Skipping user ${user.email} - password appears to be already hashed`);
            }
        }

        console.log('Password migration completed successfully');
    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

migratePasswords();