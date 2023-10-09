const User = require('../models/User');
const bcrypt = require('bcrypt');

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

exports.changePassword = async (req, res) => {
  try {
    //get authenticated user
    const user = await User.findOne({accountNumber : req.user.accountNumber});

    if (!user) {
      return res.status(404).json({message :'Account not found'});
    }

    //Check if old password matches current password
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if(!isMatch) {
      return res.status(400).json({message : 'Old password in incorrect'});
    }

    //Hash and update password
    const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
    user.password = newPasswordHash;

    await user.save();

    res.json({ message : 'Password changed successfully'});
  } catch (error){
    console.error(error);
    res.status(500).json({ message : 'Failed to change password'});
  }
}

exports.initiatePasswordReset = async (req, res) => {
  try {
    const user = await User.findOne({ email : req.body,email});

    if (!user) {
      return res.status(404).json({ message : 'Account not found'});
    }

    res.json({ message : 'Password reset email sent successfully'});
  } catch(error) {
    console.error(error);
    res.status(500).json({ message : 'Failed to initiate password reset'});
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email : req.body.email })

    if (!user) {
      return res.status(404).json({ message : 'Account not found'});
    }
    const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
    user.password = newPasswordHash;

    // Save the updated password
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message : 'Failed to reset password'});
  }
};