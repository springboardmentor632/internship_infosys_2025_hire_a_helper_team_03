const express = require('express');
const router = express.Router();
const otpController = require('../controller/otpController');

router.post('/verify-otp', otpController.verifyOtp);

module.exports = router;
