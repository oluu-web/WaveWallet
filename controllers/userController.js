const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ accountNumber: req.user.accountNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProfile = {
      accountNumber: user.accountNumber,
      name: user.firstName+user.lastName,
      email: user.email,
      // Add other user properties you want to include in the profile
    };

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    // Get user by account number
    const user = await User.findOne({ accountNumber: req.user.accountNumber });

    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastname = req.body.lastName || user.lastName
    user.email = req.body.email || user.email;

    // Save the updated data
    await user.save();

    res.json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user profile' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Find and remove the user by account number
    await User.findOneAndRemove({ accountNumber: req.user.accountNumber });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
