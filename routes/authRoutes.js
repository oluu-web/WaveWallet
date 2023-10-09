const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

//Register User
router.post('/register', authController.registerUser);

//log in an existing user
router.post('/login', authController.loginUser);

//Get user's profile (authentication needed)
router.get('/user', authMiddleware.authenticateUser, authController.getUserProfile);

// Log out the user (optional, depends on your authentication mechanism)
router.post('/logout', authController.logoutUser);

module.exports = router;