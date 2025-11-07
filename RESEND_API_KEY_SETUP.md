# 🔑 Resend API Key Setup - URGENT

## ❌ Current Issue
Your Resend API key is **INVALID**. The backend logs show:
```
error: {
  statusCode: 401,
  name: 'validation_error',
  message: 'API key is invalid'
}
```

## ✅ How to Fix (5 Minutes)

### Step 1: Get Your Resend API Key

1. **Open Browser**: Go to https://resend.com

2. **Sign Up** (if you don't have an account):
   - Click "Start Building for Free"
   - Enter your email: `prajapatiankita084@gmail.com`
   - Verify your email
   - Complete signup

3. **Login** (if you already have an account):
   - Use your credentials

4. **Create API Key**:
   - Once logged in, look for **"API Keys"** in the left sidebar
   - Click **"Create API Key"**
   - Name: `Hire A Helper OTP`
   - Permission: **Full Access** (or at least "Sending access")
   - Click **Create**
   - **COPY THE KEY** - It will look like: `re_123abc456def789ghi...` (longer than what you have)

### Step 2: Update Your .env File

1. Open: `backend/.env`

2. Find this line:
   ```env
   RESEND_API_KEY=re_4tckgmoR...
   ```

3. Replace with your NEW key:
   ```env
   RESEND_API_KEY=re_your_complete_new_key_here_no_spaces
   ```

4. Save the file

### Step 3: Restart Backend Server

1. Stop the backend server (Ctrl+C in the terminal)

2. Start it again:
   ```bash
   cd backend
   node server.js
   ```

### Step 4: Test Again

1. Go to signup page: http://localhost:3000/signup
2. Fill in the form with email: `prajapatiankita084@gmail.com`
3. Click "Create Account"
4. Check your email inbox (and spam folder)
5. You should receive the OTP email!

---

## 🎯 Important Notes

### Free Tier Limits
- ✅ 3,000 emails per month
- ✅ 100 emails per day
- ✅ Perfect for development!

### Using Test Email
For development, Resend provides `onboarding@resend.dev` as the sender.
- This works immediately
- No domain verification needed
- Great for testing

### For Production (Later)
- Verify your own domain
- Use custom sender email (e.g., `noreply@yourdomain.com`)
- Better deliverability

---

## 🔍 Verify It's Working

After updating the API key, you should see in backend logs:
```
OTP email sent successfully: {
  data: { id: 'some-email-id' },  ← This means SUCCESS!
  error: null
}
```

Instead of:
```
error: {
  statusCode: 401,
  message: 'API key is invalid'  ← This is the current error
}
```

---

## 📧 Email Template Preview

Once working, users will receive this email:

**Subject:** Your OTP Code - Hire A Helper

**Content:**
- Beautiful gradient header (purple)
- Large 6-digit OTP code
- "Code expires in 10 minutes" message
- Professional branding

---

## 🆘 Troubleshooting

### Still getting "API key is invalid"?
- Make sure you copied the COMPLETE key
- No extra spaces before/after the key
- Key should be long (40+ characters)
- Must start with `re_`

### Email not received?
- Check spam/junk folder
- Verify email address is correct
- Check Resend dashboard for delivery logs
- Wait up to 30 seconds (usually instant)

### Backend not updating?
- Make sure you saved `.env` file
- Restart the backend server
- Check for any typos in the key

---

## 📞 Quick Links

- **Resend Dashboard**: https://resend.com/dashboard
- **Resend API Keys**: https://resend.com/api-keys
- **Resend Docs**: https://resend.com/docs

---

**Once you update the API key, the OTP emails will work perfectly! 🚀**
