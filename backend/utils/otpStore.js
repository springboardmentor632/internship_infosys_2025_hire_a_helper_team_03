/**
 * In-memory OTP store
 * For production, consider using Redis or a database
 */
const otpStore = new Map();

/**
 * Generate a 6-digit OTP
 * @returns {string} - 6-digit OTP
 */
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store OTP with expiration time
 * @param {string} email - User email
 * @param {string} otp - Generated OTP
 * @param {number} expiryMinutes - Expiry time in minutes (default: 10)
 */
function storeOTP(email, otp, expiryMinutes = 10) {
    const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);
    otpStore.set(email, {
        otp,
        expiryTime,
        attempts: 0
    });
    console.log(`OTP stored for ${email}, expires at ${new Date(expiryTime).toISOString()}`);
}

/**
 * Verify OTP
 * @param {string} email - User email
 * @param {string} otp - OTP to verify
 * @returns {Object} - { valid: boolean, message: string }
 */
function verifyOTP(email, otp) {
    const stored = otpStore.get(email);
    
    if (!stored) {
        return { valid: false, message: 'OTP not found or expired. Please request a new one.' };
    }
    
    // Check if OTP expired
    if (Date.now() > stored.expiryTime) {
        otpStore.delete(email);
        return { valid: false, message: 'OTP has expired. Please request a new one.' };
    }
    
    // Check attempts (max 5 attempts)
    if (stored.attempts >= 5) {
        otpStore.delete(email);
        return { valid: false, message: 'Too many failed attempts. Please request a new OTP.' };
    }
    
    // Verify OTP
    if (stored.otp === otp) {
        otpStore.delete(email);
        return { valid: true, message: 'OTP verified successfully!' };
    } else {
        stored.attempts += 1;
        otpStore.set(email, stored);
        return { 
            valid: false, 
            message: `Invalid OTP. ${5 - stored.attempts} attempts remaining.` 
        };
    }
}

/**
 * Delete OTP from store
 * @param {string} email - User email
 */
function deleteOTP(email) {
    otpStore.delete(email);
    console.log(`OTP deleted for ${email}`);
}

/**
 * Check if OTP exists and is valid
 * @param {string} email - User email
 * @returns {boolean}
 */
function hasValidOTP(email) {
    const stored = otpStore.get(email);
    if (!stored) return false;
    if (Date.now() > stored.expiryTime) {
        otpStore.delete(email);
        return false;
    }
    return true;
}

// Clean up expired OTPs every 5 minutes
setInterval(() => {
    const now = Date.now();
    let cleanedCount = 0;
    for (const [email, data] of otpStore.entries()) {
        if (now > data.expiryTime) {
            otpStore.delete(email);
            cleanedCount++;
        }
    }
    if (cleanedCount > 0) {
        console.log(`Cleaned up ${cleanedCount} expired OTPs`);
    }
}, 5 * 60 * 1000);

module.exports = {
    generateOTP,
    storeOTP,
    verifyOTP,
    deleteOTP,
    hasValidOTP
};
