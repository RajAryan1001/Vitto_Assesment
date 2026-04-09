// const Application = require('../models/Application');
// const { calculateDecision } = require('../services/decisionEngine');

// exports.submitApplication = async (req, res) => {
//   try {
//     const decisionResult = calculateDecision(req.body);

//     const application = new Application({
//       ...req.body,
//       ...decisionResult
//     });

//     await application.save();

//     res.status(201).json({
//       success: true,
//       message: "Application processed successfully",
//       data: {
//         applicationId: application._id,
//         ...decisionResult
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


const Application = require('../models/Application');
const { calculateDecision } = require('../services/decisionEngine');

// ✅ Existing - Submit Application
exports.submitApplication = async (req, res) => {
  try {
    const decisionResult = calculateDecision(req.body);

    const application = new Application({
      ...req.body,
      ...decisionResult
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "Application processed successfully",
      data: {
        applicationId: application._id,
        ...decisionResult
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ NEW - Get all applications (for History page)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ NEW - Get single application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, error: "Application not found" });
    }
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ NEW - Delete application by ID (for delete functionality)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, error: "Application not found" });
    }
    res.status(200).json({ 
      success: true, 
      message: "Application deleted successfully",
      data: application 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ NEW - Update application by ID (optional)
exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ success: false, error: "Application not found" });
    }
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};