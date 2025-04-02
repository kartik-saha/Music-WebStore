// backend/routes/user.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');  // JWT middleware
const userController = require('../controllers/userController');

// Get user data
router.get('/', authenticate, userController.getUserData);

module.exports = router;
