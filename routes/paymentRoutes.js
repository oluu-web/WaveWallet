const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new payment (requires authentication)
router.post('/', authMiddleware.authenticateUser, paymentController.createPayment);

// Get a list of payments made by the user (requires authentication)
// router.get('/', authMiddleware.authenticateUser, paymentController.getUserPayments);

// Get details of a specific payment (requires authentication)
router.get('/:id', authMiddleware.authenticateUser, paymentController.getPaymentDetails);

module.exports = router;
