// components/finance/FinanceCalculator.tsx - Update the apply button
import React from 'react';
// import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface FinanceCalculatorProps {
  isDarkMode: boolean;
  loanAmount: number;
  setLoanAmount: (value: number) => void;
  downPayment: number;
  setDownPayment: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  termMonths: number;
  setTermMonths: (value: number) => void;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  onApplyClick: () => void;
}

const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
  isDarkMode,
  onApplyClick
}) => {
  // ... rest of the component code

  return (
    <div className={`rounded-2xl p-6 shadow-xl ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
    }`}>
      {/* ... calculator inputs and results ... */}
      
      {/* Update the apply button */}
      <div className="pt-6">
        <button
          onClick={onApplyClick}
          className={`group relative w-full px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl ${
            isDarkMode
              ? 'text-white border border-gray-500 to-gray-900 text-white'
              : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
          } hover:scale-105 font-bold text-lg`}
        >
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <span>Apply for This Loan</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
        <p className="text-center text-sm mt-2 opacity-70">
          Get pre-approved in minutes
        </p>
      </div>
    </div>
  );
};

export default FinanceCalculator;