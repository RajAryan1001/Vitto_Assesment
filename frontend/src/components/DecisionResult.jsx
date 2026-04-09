import { useLending } from '../context/LendingContext';
import { CheckCircle, XCircle, RefreshCw, TrendingUp, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function DecisionResult() {
  const { result, resetForm } = useLending();

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">No decision result available</p>
      </div>
    );
  }

  const reasonCodes = Array.isArray(result.reasonCodes) ? result.reasonCodes : [];
  const decision = result.decision || 'Pending';
  const creditScore = result.creditScore || 0;
  const reasoning = result.reasoning || "Decision generated based on revenue, loan ratio, and risk analysis.";

  const scoreData = [
    { name: 'Your Score', value: creditScore, color: creditScore >= 700 ? '#22c55e' : creditScore >= 550 ? '#eab308' : '#ef4444' },
    { name: 'Remaining', value: 900 - creditScore, color: '#e5e7eb' }
  ];

  const getScoreLabel = (score) => {
    if (score >= 750) return { label: 'Excellent', color: 'text-green-600' };
    if (score >= 700) return { label: 'Very Good', color: 'text-green-500' };
    if (score >= 650) return { label: 'Good', color: 'text-yellow-600' };
    if (score >= 550) return { label: 'Fair', color: 'text-orange-500' };
    return { label: 'Poor', color: 'text-red-600' };
  };

  const scoreInfo = getScoreLabel(creditScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {decision === 'Approved' ? (
          <CheckCircle className="mx-auto text-green-500 mb-6" size={90} />
        ) : (
          <XCircle className="mx-auto text-red-500 mb-6" size={90} />
        )}
      </motion.div>

      <h2 className={`text-6xl font-bold mb-3 ${
        decision === 'Approved' ? 'text-green-600' : 'text-red-600'
      }`}>
        {decision}
      </h2>

      {/* Credit Score Section */}
      <div className="max-w-md mx-auto mb-10">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Award className="text-yellow-500" size={24} />
              <span className="text-gray-600">Credit Score</span>
            </div>
            <div className={`font-bold text-xl ${scoreInfo.color}`}>
              {scoreInfo.label}
            </div>
          </div>
          
          <div className="text-5xl font-bold text-gray-800 mb-2">{creditScore}</div>
          <div className="text-sm text-gray-500 mb-4">out of 900</div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(creditScore / 900) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-4 rounded-full ${
                  creditScore >= 700 ? 'bg-green-500' : 
                  creditScore >= 550 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0</span>
              <span>450</span>
              <span>900</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Pie Chart */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Score Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={scoreData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Reason Codes */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Key Factors</h3>
          <div className="flex flex-wrap gap-2">
            {reasonCodes.length > 0 ? (
              reasonCodes.map((code, index) => (
                <motion.span 
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-medium shadow-sm"
                >
                  {code.replace(/_/g, ' ')}
                </motion.span>
              ))
            ) : (
              <p className="text-gray-500 italic">No specific reason codes</p>
            )}
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold">Analysis Summary</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{reasoning}</p>
      </div>

      {/* New Application Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetForm}
        className="flex items-center justify-center gap-3 mx-auto bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all"
      >
        <RefreshCw size={24} /> 
        New Application
      </motion.button>
    </motion.div>
  );
}