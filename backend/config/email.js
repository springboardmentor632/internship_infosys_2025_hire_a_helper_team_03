const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send OTP email using Resend
 * @param {string} to - Recipient email address
 * @param {string} otp - 6-digit OTP code
 * @returns {Promise} - Resend API response
 */
async function sendOTPEmail(to, otp) {
    try {
        const res = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: [to],
            subject: 'Your OTP Code - Hire A Helper',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>OTP Verification</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td style="padding: 20px 0; text-align: center;">
                                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <!-- Header -->
                                    <tr>
                                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Hire A Helper</h1>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 30px;">
                                            <h2 style="margin: 0 0 20px; color: #333333; font-size: 24px; font-weight: bold;">Email Verification</h2>
                                            <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 24px;">
                                                Thank you for registering with Hire A Helper! Please use the following OTP code to verify your email address:
                                            </p>
                                            
                                            <!-- OTP Box -->
                                            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 30px; margin: 30px 0; text-align: center;">
                                                <p style="margin: 0 0 10px; color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your OTP Code</p>
                                                <div style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                                    ${otp}
                                                </div>
                                            </div>
                                            
                                            <p style="margin: 0 0 15px; color: #666666; font-size: 14px; line-height: 21px;">
                                                <strong>Important:</strong> This OTP will expire in <strong>10 minutes</strong>.
                                            </p>
                                            <p style="margin: 0 0 15px; color: #666666; font-size: 14px; line-height: 21px;">
                                                If you didn't request this code, please ignore this email.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
                                            <p style="margin: 0 0 10px; color: #999999; font-size: 12px;">
                                                This is an automated message, please do not reply to this email.
                                            </p>
                                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                                © ${new Date().getFullYear()} Hire A Helper. All rights reserved.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
            text: `Your OTP code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\n© ${new Date().getFullYear()} Hire A Helper. All rights reserved.`
        });

        // res has shape similar to: { data: { id }, error: null, headers: { ... } }
        console.log('Resend response:', res);

        // If Resend reports an error, throw so caller can surface it
        if (res && res.error) {
            console.error('Resend reported an error:', res.error);
            throw new Error(res.error.message || 'Resend API error');
        }

        // Check quota headers (if present) — if daily or monthly quota is 0, surface a clear error
        const headers = (res && res.headers) || {};
        const dailyQuota = headers['x-resend-daily-quota'];
        const monthlyQuota = headers['x-resend-monthly-quota'];
        if (dailyQuota === '0' || monthlyQuota === '0') {
            console.warn('Resend quota exhausted', { dailyQuota, monthlyQuota, headers });
            // throw to inform frontend that email likely won't be delivered due to quota
            throw new Error('Email not sent: Resend daily/monthly quota exhausted. Please check Resend account limits.');
        }

        // If we have a data object with an id, return it (success)
        if (res && res.data && res.data.id) {
            console.log('OTP email accepted by Resend, message id:', res.data.id);
            return res;
        }

        // Fallback: return full response
        return res;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
}

module.exports = { sendOTPEmail };
