const nodemailer = require('nodemailer');

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp, firstName) => {
    const mailOptions = {
        from: `"Hire A Helper" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Email - Hire A Helper',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .otp-box { background: white; border: 2px dashed #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
                    .otp-code { font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; }
                    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                    .button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🤝 Hire A Helper</h1>
                        <p style="margin: 0;">Email Verification</p>
                    </div>
                    <div class="content">
                        <h2>Hello ${firstName}!</h2>
                        <p>Thank you for signing up with Hire A Helper. To complete your registration, please verify your email address.</p>
                        
                        <div class="otp-box">
                            <p style="margin: 0; color: #6b7280; font-size: 14px;">Your verification code is:</p>
                            <div class="otp-code">${otp}</div>
                        </div>
                        
                        <p><strong>This code will expire in 10 minutes.</strong></p>
                        
                        <p>If you didn't create an account with Hire A Helper, please ignore this email.</p>
                        
                        <div class="footer">
                            <p>This is an automated email. Please do not reply.</p>
                            <p>&copy; 2025 Hire A Helper. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully to:', email);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = {
    generateOTP,
    sendOTPEmail
};
