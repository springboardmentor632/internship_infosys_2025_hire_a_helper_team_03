# Resend OTP Integration Guide

## Overview
This project now uses **Resend** as the third-party email service for OTP verification during user registration. Resend provides a modern, developer-friendly API for sending transactional emails.

---

## Setup Instructions

### 1. Get Resend API Key

1. Visit [Resend](https://resend.com) and create a free account
2. Navigate to **API Keys** in your dashboard
3. Create a new API key
4. Copy the API key (it starts with `re_`)

### 2. Configure Domain (Optional but Recommended)

For production use:
1. Add your domain in Resend dashboard
2. Verify DNS records (SPF, DKIM, DMARC)
3. Use your verified domain email (e.g., `noreply@yourdomain.com`)

For development/testing:
- You can use the default `onboarding@resend.dev` (limited to 100 emails/day)

### 3. Environment Variables

Add these to your `backend/.env` file:

```env
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev

# For production with verified domain:
# RESEND_FROM_EMAIL=noreply@yourdomain.com

# Existing variables
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## How It Works

### Registration Flow

1. **User fills signup form** → Enters email, password, etc.
2. **Frontend sends OTP request** → POST to `/api/auth/send-otp`
3. **Backend generates 6-digit OTP** → Stores in memory with 10-min expiry
4. **Resend sends email** → Beautiful HTML email with OTP code
5. **User receives email** → Enters OTP in verification page
6. **Frontend verifies OTP** → POST to `/api/auth/verify-register`
7. **Backend validates OTP** → Creates user account if valid
8. **User redirected to login** → Registration complete!

---

## API Endpoints

### 1. Send OTP
**POST** `/api/auth/send-otp`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "OTP sent successfully to your email",
  "email": "user@example.com"
}
```

---

### 2. Verify OTP & Register
**POST** `/api/auth/verify-register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "phone": "1234567890",
  "password": "securePassword123",
  "otp": "123456"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

---

### 3. Resend OTP
**POST** `/api/auth/resend-otp`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "New OTP sent successfully to your email"
}
```

---

## Features

### Email Template
- **Professional HTML design** with gradient header
- **Responsive layout** for all devices
- **Large, readable OTP** in monospace font
- **Expiry information** (10 minutes)
- **Plain text fallback** for email clients without HTML support

### Security Features
- OTP expires in **10 minutes**
- Maximum **5 verification attempts** per OTP
- OTP stored in memory (no database pollution)
- Automatic cleanup of expired OTPs every 5 minutes
- Secure password hashing with bcrypt

### User Experience
- **Auto-focus** on next input field
- **Paste support** for 6-digit codes
- **Visual countdown timer** showing expiry time
- **Resend option** when timer expires
- **Real-time validation** with clear error messages
- **Loading states** during API calls

---

## File Structure

```
backend/
├── config/
│   └── email.js              # Resend email configuration
├── controller/
│   └── authController.js     # OTP & registration handlers
├── routes/
│   └── auth.js               # OTP endpoints
└── utils/
    └── otpStore.js           # In-memory OTP management

frontend/
└── src/
    └── Pages/
        ├── signup.jsx         # Updated to send OTP
        └── OTPVerification.jsx # OTP input page
```

---

## Testing

### Local Testing

1. Start backend:
```bash
cd backend
npm install
node server.js
```

2. Start frontend:
```bash
cd frontend
npm install
npm start
```

3. Test registration flow:
   - Go to `/signup`
   - Fill in the form
   - Click "Create Account"
   - Check your email for OTP
   - Enter OTP on verification page

---

## Production Considerations

### 1. Use Redis for OTP Storage
Replace in-memory storage with Redis for scalability:

```javascript
const redis = require('redis');
const client = redis.createClient();

async function storeOTP(email, otp) {
  await client.setEx(`otp:${email}`, 600, JSON.stringify({ otp, attempts: 0 }));
}
```

### 2. Rate Limiting
Add rate limiting to prevent abuse:

```javascript
const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 requests per window
  message: 'Too many OTP requests, please try again later.'
});

router.post('/send-otp', otpLimiter, sendRegistrationOTP);
```

### 3. Email Verification Domain
- Verify your domain in Resend
- Use a professional email address (e.g., `verify@yourdomain.com`)
- Set up DMARC, SPF, and DKIM records

### 4. Monitoring
- Log all OTP sends and verifications
- Monitor Resend API usage
- Set up alerts for failed emails

---

## Troubleshooting

### OTP Email Not Received
1. Check spam/junk folder
2. Verify RESEND_API_KEY is correct
3. Check Resend dashboard for delivery logs
4. Ensure email address is valid

### "OTP Expired" Error
- OTPs expire after 10 minutes
- Click "Resend OTP" to get a new code

### "Too Many Failed Attempts"
- Each OTP allows 5 verification attempts
- Request a new OTP after 5 failed attempts

### Backend Errors
- Check `.env` file has RESEND_API_KEY
- Verify Resend account is active
- Check console logs for detailed errors

---

## Benefits of Resend

✅ **Easy Integration** - Simple, modern API  
✅ **Reliable Delivery** - High deliverability rates  
✅ **Developer-Friendly** - Great documentation  
✅ **Free Tier** - 3,000 emails/month (100/day)  
✅ **Fast** - Average delivery time < 1 second  
✅ **Scalable** - Handles high volumes  
✅ **React Support** - React Email templates (optional)

---

## Next Steps

1. Set up Resend account and get API key
2. Add environment variables to `.env`
3. Test the complete registration flow
4. Customize email template (optional)
5. Add rate limiting for production
6. Consider Redis for production OTP storage

---

## Support

For issues or questions:
- **Resend Docs**: https://resend.com/docs
- **Resend API Reference**: https://resend.com/docs/api-reference

---

**Integration Complete! 🎉**

Your application now has a professional OTP verification system powered by Resend.
