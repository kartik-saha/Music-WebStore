// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

module.exports = router;
