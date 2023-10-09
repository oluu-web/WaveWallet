const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const commonPasswords = require('../Passwords');

//Define validation rules

const registrationValidationRules = [
 body('name').notEmpty().withMessage('Name is required'),
 body('email').isEmail().withMessage('Invalid email format'),
 body('password')
 .isLength({min: 8})
 .withMessage('Password must be at least 8 characters long')
 .custom(async (password, { req }) => {
  if (!/[A-Z]/.test(password)) {
   throw new Error('Password must contain at least one uppercase letter');
  }

  if(!/[a-z]/.test(password)) {
   throw new Error('Password must contsin at least one lowercase letter')
  }

  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
   throw new Error('Password must contain one of these symbols: !@#$%^&*()_+{}\[\]:;<>,.?~\\-')
  }

  if (!/\d/.test(password)) {
   throw new Error('Password must contain at least one digit');
  }

  //check if password is a common password
  if (commonPasswords.includes(password.toLowerCase())) {
   throw new Error('Password is commonly used and not allowed');
  }

  return true
 }),
];

exports.registerUJser = async (req, res) => {
 try {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
  }

  const {firstName, lastName, email, password } = req.body;

  //check if email already exists
  let user = await User.findOne({ email });

  if(user) {
   return res.status(400).json({message: 'Account with this email already exists'});
  }

  //Hash tne password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user = new User ({
   firstName,
   lastNane,
   email,
   password: hashedPassword,
  });

  await user.save();

  //Generate JWT for authentication
  const payload = {
   user: {
    id: user.accountNumber,
   },
  };

  jwt.sign(
   payload,
   process.env.JWT_SECRET,
   { expiresIn: '1h'},
   (err, token) => {
    if (err) throw err;
    res.json({ token });
   }
  );
 } catch (error) {
  console.error(error);
  res.status(500).json({message : 'Registration failed'});
 }
};

exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Your secret key for JWT
      { expiresIn: '1h' }, // Token expiration time
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // Get the user's profile from req.user (assuming user authentication middleware sets req.user)
    const user = req.user;

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

exports.logoutUser = (req, res) => {
  try {
    // Clear the user's session or token (depending on your authentication method)
    // You can add your logout logic here
    // Client Side handles logout by deleting JWT token
    res.json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Logout failed' });
  }
};