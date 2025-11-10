// Temporary storage for pending user registrations
// Users will be stored here until OTP verification
const pendingRegistrations = new Map();

// Clean up expired registrations (older than 15 minutes)
const cleanupExpiredRegistrations = () => {
    const now = Date.now();
    for (const [email, data] of pendingRegistrations.entries()) {
        if (now > data.otpExpiry.getTime()) {
            pendingRegistrations.delete(email);
            console.log(`Cleaned up expired registration for: ${email}`);
        }
    }
};

// Run cleanup every 5 minutes
setInterval(cleanupExpiredRegistrations, 5 * 60 * 1000);

module.exports = {
    pendingRegistrations,
    cleanupExpiredRegistrations
};
