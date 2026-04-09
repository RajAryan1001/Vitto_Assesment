// // src/middleware/errorHandler.js

// const errorHandler = (err, req, res, next) => {
//   console.error(`❌ Error: ${err.message}`);

//   // Mongoose validation error
//   if (err.name === 'ValidationError') {
//     return res.status(400).json({
//       success: false,
//       error: 'Validation Error',
//       details: Object.values(err.errors).map(e => e.message)
//     });
//   }

//   // Zod validation error (already handled in validate.js, but safety)
//   if (err.name === 'ZodError') {
//     return res.status(400).json({
//       success: false,
//       error: 'Validation Error',
//       details: err.errors.map(e => e.message)
//     });
//   }

//   // Default error
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//     error: process.env.NODE_ENV === 'development' ? err.stack : undefined
//   });
// };

// module.exports = errorHandler;
// src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);
  console.error(err.stack); // Stack trace bhi print karo

  // Mongoose validation error - SAFE
  if (err.name === 'ValidationError') {
    // ✅ Safe check
    const details = err.errors && typeof err.errors === 'object'
      ? Object.values(err.errors).map(e => e?.message || 'Invalid field')
      : ['Validation error occurred'];
    
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: details
    });
  }

  // Zod validation error - SAFE
  if (err.name === 'ZodError') {
    // ✅ Safe check
    const details = err.errors && Array.isArray(err.errors)
      ? err.errors.map(e => e?.message || 'Invalid field')
      : [err.message || 'Validation error'];
    
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: details
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;