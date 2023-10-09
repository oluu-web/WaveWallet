const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware function to authenticate user
const authenticateUser = (req, res, next) => {
  // Check if a JWT token is present in the request headers
  const token = req.header('x-auth-token');

  // If no token is found, return an unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach the decoded user information to the request for further use
    req.user = decoded.user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return an unauthorized response
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  authenticateUser,
};
