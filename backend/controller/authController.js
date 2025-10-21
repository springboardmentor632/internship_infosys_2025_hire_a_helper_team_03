const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOtpEmail = require('../utils/emailSender'); // Nodemailer setup you created

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.register = async (req, res) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const { firstName, lastName, phone, email, password } = req.body;
    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and expiration time (5 minutes from now)
    const otp = generateOtp();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    // Save user with OTP info
    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      otp,
      otpExpires
    });

    await user.save();

    // Send the OTP email
    try {
      await sendOtpEmail(email, otp);
    } catch (emailError) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.status(201).json({ message: 'User registered successfully, OTP sent to email' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
