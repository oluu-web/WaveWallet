// Middleware function to handle errors
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Handle specific types of errors and send appropriate responses
  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }

  // Handle other types of errors
  res.status(500).json({ message: 'Internal Server Error' });
};

class CustomError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  errorHandler,
  CustomError,
};
