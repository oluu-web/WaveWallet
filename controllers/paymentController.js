const Payment = require('../models/Payment');
const User = require('../models/User');

exports.createPayment = async (req, res) => {
 try {
  const {amount, payeeAccountNumber} = req.body;
  
  const loggedInUser = req.user;
//check if the recepient exists
  const payee = await User.findOne({accountNumber:payeeAccountNumber});
  if (!payee) {
   return res.status(404).json({message : 'Account not found'});
  }

  const newPayment = new Payment({
   amount,
   payerAccountNumber: loggedInUser.accountNumber,
   payeeAccountNumber,
  });

  await newPayment.save()

   res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create payment' });
  }
 }

 // Controller function to get payment details by payment ID
exports.getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch payment details' });
  }
};
