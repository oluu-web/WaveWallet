const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new card (linked to a user's account, requires authentication)
router.post('/', authMiddleware.authenticateUser, cardController.createCard);

// Get details of a specific card (requires authentication)
router.get('/:id', authMiddleware.authenticateUser, cardController.getCardDetails);

module.exports = router;
