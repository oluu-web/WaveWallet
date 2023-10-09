const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const commonPasswords = require('../Passwords')

//Define validation rules

const registrationValidationRules = [
 body('name').notEmpty().withMessage('Name is required'),
 body('email').isEmail().withMessage('Invalid email format'),
 body('password')
 .isLength({min: 8})
 .contains
]