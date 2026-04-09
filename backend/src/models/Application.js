const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  ownerName: String,
  pan: String,
  businessType: String,
  monthlyRevenue: Number,
  loanAmount: Number,
  tenureMonths: Number,
  purpose: String,
  decision: String,
  creditScore: Number,
  reasonCodes: [String],
  reasoning: String,
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true  // ✅ Optional: Adds createdAt & updatedAt automatically
});

module.exports = mongoose.model('Application', ApplicationSchema);