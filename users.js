const express = require('express');
const router = express.Router();

// Simple user profile endpoint
router.get('/profile', (req, res) => {
  // In a real app, this would get user data from JWT token
  res.json({
    message: 'User profile endpoint - implement authentication for full functionality'
  });
});

module.exports = router; 