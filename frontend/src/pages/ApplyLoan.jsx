import LoanForm from '../components/LoanForm';
import { motion } from 'framer-motion';
import { Shield, Zap, Clock } from 'lucide-react';

export default function ApplyLoan() {
  const benefits = [
    { icon: Zap, text: 'Instant Decision in 2 Minutes' },
    { icon: Shield, text: '100% Secure & Confidential' },
    { icon: Clock, text: 'Funds Disbursed in 24 Hours' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Apply for Business Loan</h1>
        <p className="text-gray-600 mt-2 text-lg">Get instant decision in seconds • No paperwork • Competitive rates</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <LoanForm />
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Why Choose Vitto?</h3>
              <div className="space-y-4">
                {benefits.map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Icon className="text-blue-600" size={20} />
                      </div>
                      <span className="text-gray-700">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-3">Loan Eligibility</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ Minimum monthly revenue: ₹50,000</li>
                <li>✅ Loan amount: ₹50,000 - ₹5 Crore</li>
                <li>✅ Tenure: 6 - 84 months</li>
                <li>✅ Interest rates: Starting at 9.9%</li>
                <li>✅ PAN card required</li>
                <li>✅ Business vintage: 1+ year</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}