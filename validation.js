const { body } = require('express-validator');
const commonPasswords = require('./Passwords')

const registrationValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .custom((password, { req }) => {
      // Check if password contains at least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter');
      }

      // Check if password contains at least one lowercase letter
      if (!/[a-z]/.test(password)) {
        throw new Error('Password must contain at least one lowercase letter');
      }

      // Check if password contains at least one symbol (non-alphanumeric character)
      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        throw new Error('Password must contain at least one symbol');
      }

      // Check if password contains at least one digit
      if (!/\d/.test(password)) {
        throw new Error('Password must contain at least one digit');
      }

      // Check if password is not a commonly used password
      if (commonPasswords.includes(password.toLowerCase())) {
        throw new Error('Password is commonly used and not allowed');
      }

      return true;
    }),
];

module.exports = {
  registrationValidationRules,
};
