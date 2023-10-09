// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// User management
router.get('/profile', authMiddleware.authenticateUser, userController.getUserProfile);

router.put('/profile', authMiddleware.authenticateUser, userController.updateUserProfile);

router.delete('/profile', authMiddleware.authenticateUser, userController.deleteUser);

//password management
router.put('/password', authMiddleware.authenticateUser, userController.changePassword);

router.post('/forgot-password', userController.initiatePasswordReset);

router.put('/reset-password/:token', userController.resetPassword);


module.exports = router;
