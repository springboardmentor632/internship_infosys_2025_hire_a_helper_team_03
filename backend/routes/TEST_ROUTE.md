const express = require('express');
const router = express.Router();

// Test route to verify forgot-password is accessible
router.post('/test-forgot', (req, res) => {
  res.json({ message: 'Forgot password route is working!' });
});

module.exports = router;
