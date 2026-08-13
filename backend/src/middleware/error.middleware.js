import ApiError from '../utils/ApiError.js';

export const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route not found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found with specified ID';
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = 'An account with this email address already exists. Please log in instead.';
  }


  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};
