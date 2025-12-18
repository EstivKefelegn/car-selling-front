// pages/finance/components/AdditionalCalculators.tsx
import React from 'react';
import FinanceButton from './FinanceButton';
import { safeToFixed, safeToLocaleString } from '../../../utils/Formatters';

interface AdditionalCalculatorsProps {
  calculators: any[];
  isDarkMode: boolean;
}

const AdditionalCalculators: React.FC<AdditionalCalculatorsProps> = ({ 
  calculators, 
  isDarkMode 
}) => {
  const handleTryCalculator = (calculatorId: number) => {
    console.log('Try calculator clicked:', calculatorId);
    // Add your logic here
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Other Calculators</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {calculators.map((calculator: any) => (
          <div key={calculator.id} className={`rounded-xl p-6 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border shadow-lg`}>
            <h3 className="text-lg font-bold mb-2">{calculator.title}</h3>
            <p className="text-sm mb-4 opacity-80">{calculator.description}</p>
            
            {calculator.calculator_type === 'loan' && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Example Loan:</span>
                  <span className="font-semibold">
                    ${safeToLocaleString(calculator.example_loan_amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Monthly Payment:</span>
                  <span className="font-bold text-blue-600">
                    ${safeToFixed(calculator.example_monthly_payment)}
                  </span>
                </div>
              </div>
            )}
            
            <div className="mt-4">
              <FinanceButton 
                isDark={isDarkMode}
                onClick={() => handleTryCalculator(calculator.id)}
                text="Try This Calculator"
                fullWidth
                style="py-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalCalculators;