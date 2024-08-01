
const errorHandler = (err, req, res, next) => {
  
  if (err instanceof CustomError) {
    
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(err);
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
