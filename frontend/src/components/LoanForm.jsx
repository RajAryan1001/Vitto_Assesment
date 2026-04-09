import { useState } from 'react';
import { useLending } from '../context/LendingContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CreditCard, Building2, FileText as FileIcon, CheckCircle } from 'lucide-react';

export default function LoanForm() {
  const { formData, handleChange, submitApplication, loading, error } = useLending();
  const [step, setStep] = useState(1);
  
  const businessTypes = [
    { value: 'retail', label: 'Retail', icon: '🛍️' },
    { value: 'manufacturing', label: 'Manufacturing', icon: '🏭' },
    { value: 'services', label: 'Services', icon: '💼' },
    { value: 'wholesale', label: 'Wholesale', icon: '📦' },
    { value: 'others', label: 'Others', icon: '📋' },
  ];

  const nextStep = () => {
    if (step === 1 && (!formData.ownerName || !formData.pan)) {
      return;
    }
    if (step === 2 && (!formData.monthlyRevenue || !formData.loanAmount || !formData.tenureMonths)) {
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmitWrapper = (e) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
    } else {
      submitApplication(e);
    }
  };

  return (
    <form onSubmit={handleSubmitWrapper} className="space-y-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[
            { step: 1, label: 'Business Info', icon: Building2 },
            { step: 2, label: 'Loan Details', icon: CreditCard },
            { step: 3, label: 'Review & Submit', icon: FileIcon },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = step === item.step;
            const isCompleted = step > item.step;
            return (
              <div key={item.step} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-blue-600 text-white ring-4 ring-blue-200' :
                  isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                </div>
                <div className={`text-xs mt-2 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1 - Business Information */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Owner Name *
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Number *
              </label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={(e) => {
                  let value = e.target.value.toUpperCase().replace(/\s/g, '');
                  if (value.length > 10) value = value.slice(0, 10);
                  handleChange({ target: { name: 'pan', value } });
                }}
                required
                maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase tracking-widest"
                placeholder="ABCDE1234F"
              />
              <p className="text-gray-400 text-xs mt-1">
                Format: 5 LETTERS + 4 DIGITS + 1 LETTER (Example: ABCDE1234F)
              </p>
              {formData.pan && formData.pan.length === 10 && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan) && (
                <p className="text-red-500 text-xs mt-1">
                  ❌ Invalid PAN format
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {businessTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleChange({ target: { name: 'businessType', value: type.value } })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.businessType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <span className="text-2xl mr-2">{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2 - Loan Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Revenue (₹) *
              </label>
              <input
                type="number"
                name="monthlyRevenue"
                value={formData.monthlyRevenue}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requested Loan Amount (₹) *
              </label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1000000"
              />
              {formData.monthlyRevenue && formData.loanAmount && (
                <p className="text-gray-500 text-xs mt-1">
                  Loan to Revenue Ratio: {((formData.loanAmount / formData.monthlyRevenue) * 12).toFixed(1)}x annual
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenure (Months) *
              </label>
              <input
                type="number"
                name="tenureMonths"
                value={formData.tenureMonths}
                onChange={handleChange}
                required
                min="1"
                max="84"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 24"
              />
              <input
                type="range"
                min="1"
                max="84"
                value={formData.tenureMonths || 12}
                onChange={(e) => handleChange({ target: { name: 'tenureMonths', value: e.target.value } })}
                className="w-full mt-3"
              />
            </div>
          </motion.div>
        )}

        {/* Step 3 - Review & Submit */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose of Loan *
              </label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Describe how you'll use the loan amount..."
              />
            </div>

            {/* Review Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4">📋 Application Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-gray-600">Owner Name:</span>
                  <span className="font-medium">{formData.ownerName || '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-gray-600">PAN:</span>
                  <span className="font-mono">{formData.pan || '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-gray-600">Business Type:</span>
                  <span className="font-medium capitalize">{formData.businessType || '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-gray-600">Monthly Revenue:</span>
                  <span className="font-medium">₹{formData.monthlyRevenue?.toLocaleString() || '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-medium text-blue-600">₹{formData.loanAmount?.toLocaleString() || '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100">
                  <span className="text-gray-600">Tenure:</span>
                  <span className="font-medium">{formData.tenureMonths || '—'} months</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="font-medium max-w-[200px] text-right">{formData.purpose || '—'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        {step > 1 && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prevStep}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft size={20} />
            Back
          </motion.button>
        )}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white font-semibold py-4 rounded-2xl text-lg transition-all flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </>
          ) : step === 3 ? (
            "Submit Application ✅"
          ) : (
            <>
              Next
              <ChevronRight size={20} />
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}