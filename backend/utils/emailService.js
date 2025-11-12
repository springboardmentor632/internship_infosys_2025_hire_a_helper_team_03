const nodemailer = require('nodemailer');

// Create transporter for Gmail with SSL certificate handling
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Fix for self-signed certificate error
    }
});

// Verify transporter configuration on startup
transporter.verify(function (error, success) {
    if (error) {
        console.error('Email transporter verification failed:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email (Using Tailwind sky-600/sky-700 colors matching sidebar)
const sendOTPEmail = async (email, otp, firstName) => {
    const mailOptions = {
        from: `"Hire A Helper" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: '✅ Verify Your Email - Hire A Helper',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                <!-- Email Wrapper -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(2, 132, 199, 0.15);">
                    <!-- Header - Tailwind sky-600 to sky-700 gradient (matching sidebar) -->
                    <tr>
                        <td style="background: linear-gradient(to bottom, #0284c7, #0369a1); color: #ffffff; padding: 40px 30px; text-align: center; position: relative;">
                            <h1 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">🤝 Hire A Helper</h1>
                            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.95; color: #dbeafe;">Connecting Helpers & Those Who Need Help</p>
                            <!-- Accent Bar -->
                            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #38bdf8, #0284c7, #0369a1);"></div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px; background: #ffffff;">
                            <div style="font-size: 22px; color: #0369a1; margin-bottom: 15px; font-weight: 700;">Welcome, ${firstName}! 👋</div>
                            
                            <p style="color: #4b5563; font-size: 15px; margin-bottom: 25px; line-height: 1.8;">
                                Thank you for joining <strong>Hire A Helper</strong>! We're excited to have you as part of our community. 
                                To complete your registration and start using our platform, please verify your email address using the code below.
                            </p>
                            
                            <!-- OTP Container - Tailwind sky colors -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); border: 3px solid #0284c7; border-radius: 12px; padding: 30px; text-align: center; box-shadow: 0 4px 6px rgba(2, 132, 199, 0.1);">
                                        <div style="font-size: 13px; color: #0369a1; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px; font-weight: 700;">Your Verification Code</div>
                                        <div style="font-size: 44px; font-weight: 800; color: #0369a1; letter-spacing: 14px; font-family: 'Courier New', monospace; padding: 15px; background: #ffffff; border-radius: 10px; display: inline-block; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.2);">${otp}</div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Info Box -->
                            <div style="background: #e0f2fe; border-left: 5px solid #0284c7; padding: 16px 20px; margin: 25px 0; border-radius: 6px;">
                                <p style="color: #0369a1; font-size: 14px; margin: 0; font-weight: 600;">⏰ This code will expire in 10 minutes for your security.</p>
                            </div>

                            <!-- Features -->
                            <div style="margin: 30px 0; padding: 25px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 10px; border: 1px solid #bae6fd;">
                                <h3 style="color: #0369a1; font-size: 17px; margin: 0 0 15px 0; font-weight: 700;">What's Next? 🚀</h3>
                                <div style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.6;"><span style="color: #0284c7; font-weight: bold; margin-right: 10px; font-size: 16px;">✓</span>Post tasks and find reliable helpers in your area</div>
                                <div style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.6;"><span style="color: #0284c7; font-weight: bold; margin-right: 10px; font-size: 16px;">✓</span>Browse available tasks and earn by helping others</div>
                                <div style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.6;"><span style="color: #0284c7; font-weight: bold; margin-right: 10px; font-size: 16px;">✓</span>Connect with a trusted community of helpers</div>
                                <div style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.6;"><span style="color: #0284c7; font-weight: bold; margin-right: 10px; font-size: 16px;">✓</span>Track your tasks and manage requests seamlessly</div>
                            </div>
                            
                            <!-- Security Notice -->
                            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0; font-size: 14px; color: #4b5563; border: 1px solid #e5e7eb;">
                                <strong style="color: #0369a1; display: block; margin-bottom: 8px; font-size: 15px;">🔒 Security Notice</strong>
                                If you didn't create an account with Hire A Helper, please ignore this email. 
                                Your security is our priority, and no account will be created without email verification.
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 30px; text-align: center; border-top: 3px solid #0284c7;">
                            <p style="color: #4b5563; font-size: 13px; margin: 8px 0;">This is an automated message. Please do not reply to this email.</p>
                            <div style="height: 2px; background: linear-gradient(90deg, transparent, #0284c7, transparent); margin: 20px 0;"></div>
                            <p style="color: #4b5563; font-size: 13px; margin: 8px 0;">&copy; 2025 <span style="color: #0369a1; font-weight: 700; font-size: 15px;">Hire A Helper</span>. All rights reserved.</p>
                            <p style="color: #4b5563; font-size: 12px; margin-top: 10px;">Making help accessible, one task at a time.</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully to:', email);
        console.log('Message ID:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

// Send Password Reset OTP email
const sendPasswordResetOTPEmail = async (email, otp, firstName) => {
    const mailOptions = {
        from: `"Hire A Helper" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: '🔐 Reset Your Password - Hire A Helper',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                <!-- Email Wrapper -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(2, 132, 199, 0.15);">
                    <!-- Header - Tailwind sky-600 to sky-700 gradient (matching sidebar) -->
                    <tr>
                        <td style="background: linear-gradient(to bottom, #0284c7, #0369a1); color: #ffffff; padding: 40px 30px; text-align: center; position: relative;">
                            <h1 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">🤝 Hire A Helper</h1>
                            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.95; color: #dbeafe;">Password Reset Request</p>
                            <!-- Accent Bar -->
                            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #38bdf8, #0284c7, #0369a1);"></div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px; background: #ffffff;">
                            <div style="font-size: 22px; color: #0369a1; margin-bottom: 15px; font-weight: 700;">Hello, ${firstName}! 👋</div>
                            
                            <p style="color: #4b5563; font-size: 15px; margin-bottom: 25px; line-height: 1.8;">
                                We received a request to reset the password for your <strong>Hire A Helper</strong> account. 
                                To proceed with resetting your password, please use the verification code below.
                            </p>
                            
                            <!-- OTP Container - Tailwind sky colors -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); border: 3px solid #0284c7; border-radius: 12px; padding: 30px; text-align: center; box-shadow: 0 4px 6px rgba(2, 132, 199, 0.1);">
                                        <div style="font-size: 13px; color: #0369a1; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px; font-weight: 700;">Your Password Reset Code</div>
                                        <div style="font-size: 44px; font-weight: 800; color: #0369a1; letter-spacing: 14px; font-family: 'Courier New', monospace; padding: 15px; background: #ffffff; border-radius: 10px; display: inline-block; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.2);">${otp}</div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Info Box -->
                            <div style="background: #e0f2fe; border-left: 5px solid #0284c7; padding: 16px 20px; margin: 25px 0; border-radius: 6px;">
                                <p style="color: #0369a1; font-size: 14px; margin: 0; font-weight: 600;">⏰ This code will expire in 10 minutes for your security.</p>
                            </div>

                            <!-- Warning Box -->
                            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 5px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.1);">
                                <strong style="color: #92400e; display: block; margin-bottom: 10px; font-size: 15px; font-weight: 700;">⚠️ Important Security Notice</strong>
                                <p style="color: #78350f; font-size: 14px; margin: 0; line-height: 1.6;">
                                    If you did NOT request a password reset, please ignore this email and your password will remain unchanged. 
                                    Consider changing your password if you suspect unauthorized access to your account.
                                </p>
                            </div>

                            <!-- Security Tips -->
                            <div style="margin: 25px 0; padding: 25px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 10px; border: 1px solid #bae6fd;">
                                <h3 style="color: #0369a1; font-size: 17px; margin: 0 0 15px 0; font-weight: 700;">Security Tips 🛡️</h3>
                                <div style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.6;"><span style="margin-right: 10px;">🔒</span>Never share your verification code with anyone</div>
                                <div style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.6;"><span style="margin-right: 10px;">🔒</span>Create a strong password with at least 8 characters</div>
                                <div style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.6;"><span style="margin-right: 10px;">🔒</span>Use a unique password for this account</div>
                                <div style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.6;"><span style="margin-right: 10px;">🔒</span>Our team will never ask for your password via email</div>
                            </div>

                            <p style="color: #4b5563; font-size: 15px; margin-top: 25px; line-height: 1.8;">
                                If you're having trouble resetting your password or didn't make this request, 
                                please contact our support team immediately.
                            </p>
                        </td>
                    </tr>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 30px; text-align: center; border-top: 3px solid #0284c7;">
                            <p style="color: #4b5563; font-size: 13px; margin: 8px 0;">This is an automated message. Please do not reply to this email.</p>
                            <div style="height: 2px; background: linear-gradient(90deg, transparent, #0284c7, transparent); margin: 20px 0;"></div>
                            <p style="color: #4b5563; font-size: 13px; margin: 8px 0;">&copy; 2025 <span style="color: #0369a1; font-weight: 700; font-size: 15px;">Hire A Helper</span>. All rights reserved.</p>
                            <p style="color: #4b5563; font-size: 12px; margin-top: 10px;">Your account security is our priority.</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset OTP email sent successfully to:', email);
        console.log('Message ID:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending password reset OTP email:', error);
        throw new Error('Failed to send password reset OTP email');
    }
};

module.exports = {
    generateOTP,
    sendOTPEmail,
    sendPasswordResetOTPEmail
};