// const express = require('express');
// const router = express.Router();
// const { submitApplication } = require('../controllers/lendingController');
// const { validateApplication } = require('../middleware/validate');
// const rateLimit = require('express-rate-limit');

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 50,
//   message: "Too many requests, please try again later."
// });

// router.post('/api/decision', limiter, validateApplication, submitApplication);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  submitApplication, 
  getAllApplications,      // ✅ Add this
  getApplicationById,      // ✅ Add this
  deleteApplication,       // ✅ Add this
  updateApplication        // ✅ Add this (optional)
} = require('../controllers/lendingController');
const { validateApplication } = require('../middleware/validate');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many requests, please try again later."
});

// ✅ Existing route
router.post('/api/decision', limiter, validateApplication, submitApplication);

// ✅ NEW Routes for CRUD operations
router.get('/api/applications', getAllApplications);           // Get all
router.get('/api/applications/:id', getApplicationById);       // Get one
router.delete('/api/applications/:id', deleteApplication);     // Delete
router.put('/api/applications/:id', updateApplication);        // Update (optional)



module.exports = router;