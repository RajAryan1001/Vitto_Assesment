// const { z } = require('zod');

// const profileSchema = z.object({
//   ownerName: z.string().min(2, "Owner name is required"),
//   pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (e.g. ABCDE1234F)"),
//   businessType: z.enum(["retail", "manufacturing", "services", "wholesale", "others"]),
//   monthlyRevenue: z.number().positive("Monthly revenue must be positive")
// });

// const loanSchema = z.object({
//   loanAmount: z.number().positive("Loan amount must be positive"),
//   tenureMonths: z.number().int().min(1).max(84, "Tenure must be between 1-84 months"),
//   purpose: z.string().min(5, "Purpose is required")
// });

// const applicationSchema = profileSchema.merge(loanSchema);

// const validateApplication = (req, res, next) => {
//   try {
//     applicationSchema.parse(req.body);
//     next();
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: "Validation Error",
//       details: error.errors.map(e => e.message)
//     });
//   }
// };

// module.exports = { validateApplication };
const { z } = require('zod');

const profileSchema = z.object({
  ownerName: z.string().min(2, "Owner name is required"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (e.g. ABCDE1234F)"),
  businessType: z.enum(["retail", "manufacturing", "services", "wholesale", "others"]),
  monthlyRevenue: z.number().positive("Monthly revenue must be positive")
});

const loanSchema = z.object({
  loanAmount: z.number().positive("Loan amount must be positive"),
  tenureMonths: z.number().int().min(1).max(84, "Tenure must be between 1-84 months"),
  purpose: z.string().min(5, "Purpose is required")
});

const applicationSchema = profileSchema.merge(loanSchema);

const validateApplication = (req, res, next) => {
  try {
    applicationSchema.parse(req.body);
    next();
  } catch (error) {
    console.error("Validation error:", error);
    
    // ✅ Safe map with fallback
    let details = [];
    if (error.errors && Array.isArray(error.errors)) {
      details = error.errors.map(e => e.message);
    } else {
      details = [error.message || "Validation failed"];
    }
    
    res.status(400).json({
      success: false,
      error: "Validation Error",
      details: details
    });
  }
};

module.exports = { validateApplication };