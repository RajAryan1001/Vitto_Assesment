// const calculateDecision = (data) => {
//   const { monthlyRevenue, loanAmount, tenureMonths } = data;

//   let score = 700;           // Base Score
//   const reasons = [];
//   let decision = "Approved";

//   // 1. Loan to Revenue Ratio
//   const loanToRevenue = loanAmount / monthlyRevenue;
//   if (loanToRevenue > 12) {
//     score -= 180;
//     reasons.push("HIGH_LOAN_RATIO");
//   } else if (loanToRevenue > 6) {
//     score -= 90;
//     reasons.push("MEDIUM_LOAN_RATIO");
//   }

//   // 2. Revenue to EMI Ratio (Rough EMI calculation)
//   const monthlyInterest = 0.12 / 12; // 12% annual
//   const emi = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, tenureMonths)) /
//               (Math.pow(1 + monthlyInterest, tenureMonths) - 1);

//   const emiToRevenue = emi / monthlyRevenue;
//   if (emiToRevenue > 0.45) {
//     score -= 150;
//     reasons.push("HIGH_EMI_RATIO");
//   } else if (emiToRevenue > 0.30) {
//     score -= 70;
//     reasons.push("MEDIUM_EMI_RATIO");
//   }

//   // 3. Tenure Risk
//   if (tenureMonths < 6 || tenureMonths > 60) {
//     score -= 60;
//     reasons.push("TENURE_RISK");
//   }

//   // 4. Consistency / Fraud Checks
//   if (monthlyRevenue < 50000 && loanAmount > 500000) {
//     score -= 200;
//     reasons.push("DATA_INCONSISTENCY");
//   }
//   if (loanAmount > 10000000 && monthlyRevenue < 200000) {
//     reasons.push("FRAUD_SUSPICION");
//     decision = "Rejected";
//   }

//   // Final Decision
//   if (score < 550 || reasons.includes("FRAUD_SUSPICION")) {
//     decision = "Rejected";
//   }

//   score = Math.max(300, Math.min(900, Math.round(score)));

//   return {
//     decision,
//     creditScore: score,
//     reasonCodes: reasons.length ? reasons : ["NORMAL"],
//     reasoning: `Credit score based on revenue, loan ratio, EMI burden and consistency checks.`
//   };
// };

// module.exports = { calculateDecision };

const calculateDecision = (data) => {
  const { monthlyRevenue, loanAmount, tenureMonths } = data;

  let score = 700;           // Base Score
  const reasons = [];
  let decision = "Approved";

  // 1. Loan to Revenue Ratio (Stricter)
  const loanToRevenue = loanAmount / monthlyRevenue;
  if (loanToRevenue > 12) {
    score -= 250;  // Increased from 180
    reasons.push("HIGH_LOAN_RATIO");
  } else if (loanToRevenue > 8) {
    score -= 150;  // Increased from 90
    reasons.push("HIGH_LOAN_RATIO");
  } else if (loanToRevenue > 4) {
    score -= 70;   // New condition
    reasons.push("MEDIUM_LOAN_RATIO");
  }

  // 2. Revenue to EMI Ratio
  const monthlyInterest = 0.12 / 12;
  let emi = 0;
  try {
    emi = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, tenureMonths)) /
          (Math.pow(1 + monthlyInterest, tenureMonths) - 1);
  } catch (e) {
    emi = loanAmount / tenureMonths; // Fallback
  }

  const emiToRevenue = emi / monthlyRevenue;
  if (emiToRevenue > 0.50) {
    score -= 200;  // Increased from 150
    reasons.push("HIGH_EMI_RATIO");
  } else if (emiToRevenue > 0.35) {
    score -= 120;  // Increased from 70
    reasons.push("MEDIUM_EMI_RATIO");
  } else if (emiToRevenue > 0.25) {
    score -= 50;   // New condition
    reasons.push("LOW_EMI_RATIO");
  }

  // 3. Tenure Risk (Stricter)
  if (tenureMonths < 12) {
    score -= 50;
    reasons.push("SHORT_TENURE");
  } else if (tenureMonths > 48) {
    score -= 80;  // Increased from 60
    reasons.push("LONG_TENURE_RISK");
  }

  // 4. Consistency / Fraud Checks (Stricter)
  if (monthlyRevenue < 100000 && loanAmount > 300000) {
    score -= 150;  // Increased from 200 but lower threshold
    reasons.push("LOW_REVENUE_HIGH_LOAN");
  }
  if (monthlyRevenue < 50000 && loanAmount > 100000) {
    score -= 250;
    reasons.push("DATA_INCONSISTENCY");
  }
  if (loanAmount > 5000000 && monthlyRevenue < 500000) {
    reasons.push("FRAUD_SUSPICION");
    decision = "Rejected";
  }
  
  // New: Credit score check based on amount
  if (loanAmount > monthlyRevenue * 6) {
    score -= 100;
    reasons.push("LOAN_EXCEEDS_CAPACITY");
  }

  // 5. Business Type Risk (New)
  if (data.businessType === 'services' && loanAmount > 2000000) {
    score -= 80;
    reasons.push("SERVICE_SECTOR_HIGH_LOAN");
  }
  if (data.businessType === 'retail' && loanAmount > 1500000 && monthlyRevenue < 200000) {
    score -= 60;
    reasons.push("RETAIL_HIGH_LOAN_LOW_REVENUE");
  }

  // Final Decision - Stricter threshold
  if (score < 600 || reasons.includes("FRAUD_SUSPICION")) {
    decision = "Rejected";
  }

  score = Math.max(300, Math.min(900, Math.round(score)));

  return {
    decision,
    creditScore: score,
    reasonCodes: reasons.length ? reasons : ["NORMAL"],
    reasoning: `Credit score ${score} based on revenue: ₹${monthlyRevenue}, loan: ₹${loanAmount}, tenure: ${tenureMonths} months. ${reasons.length > 0 ? 'Risk factors: ' + reasons.join(', ') : 'No major risk factors found.'}`
  };
};

module.exports = { calculateDecision };