const Card = require('../models/Card');
const User = require('../models/User');

//Create new RFID card
exports.createCard = async (req, res) => {
 try{
  const { cardNumber, userAccountNumber } = req.body;

  //check if account number exists
  const user = await User.findOne({ accountNumber: userAccountNumber});

  if (!user) {
   return res.status(404).json({ message : 'Account not found'});
  }

  const newCard = Card({
   cardNumber,
   userAccountNumber,
  });

  await newCard.save();
  res.status(201).json({message : 'Card created successfully', card : newCard})
 } catch(error) {
  console.error(error);
  res.status(500).json({ message : 'Failed to create card'});
 }
};

exports.getCardDetails = async (req, res) => {
  try {
    const card = await Card.findOne({ cardNumber: req.params.cardNumber });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json({ card });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch card details' });
  }
};

// Controller function to update card details by card number
exports.updateCardDetails = async (req, res) => {
  try {
    const { cardNumber } = req.params;
    const updates = req.body;

    const card = await Card.findOne({ cardNumber });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Update card details
    Object.assign(card, updates);
    await card.save();

    res.json({ message: 'Card updated successfully', card });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update card details' });
  }
};

// Controller function to delete a card by card number
exports.deleteCard = async (req, res) => {
  try {
    const { cardNumber } = req.params;

    // Find and remove the card by card number
    await Card.findOneAndRemove({ cardNumber });

    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete card' });
  }
};