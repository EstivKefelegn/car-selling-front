// pages/FinancePage.tsx
import React, { useState } from 'react';
import useFinance from '../../hooks/useFinance';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorMessage from '../../utils/ErrorMessage';
import FinanceHero from './FinanceHero';
import FinanceCalculator from './FinanceCalculator';
import FinanceOffersGrid from './FinanceOffersGrid';
import FinanceFAQs from './FinanceFAQs';
import FinancePartners from './FinancePartners';
import FinanceFeatures from './FinanceFeatures';
import FinanceDocuments from './FinanceDocuments';

// Helper functions for safe number formatting
const safeToFixed = (value: any, decimals: number = 2): string => {
  if (value === null || value === undefined) return '0.00';
  const num = Number(value);
  if (isNaN(num)) return '0.00';
  return num.toFixed(decimals);
};

const safeToLocaleString = (value: any): string => {
  if (value === null || value === undefined) return '0';
  const num = Number(value);
  if (isNaN(num)) return '0';
  return num.toLocaleString();
};

// Reusable Button Component with your styling
interface FinanceButtonProps {
  isDark: boolean;
  onClick?: () => void;
  text: string;
  style?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const FinanceButton: React.FC<FinanceButtonProps> = ({ 
  isDark, 
  onClick, 
  text, 
  style = '', 
  fullWidth = false,
  type = 'button',
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl ${style} ${
        fullWidth ? 'w-full' : ''
      } ${
        isDark
          ? 'text-white border border-gray-500 text-white'
          : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
      } hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
      aria-label={text}
    >
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <span className="font-semibold">{text}</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};

// Secondary Button with border
const FinanceButtonSecondary: React.FC<FinanceButtonProps> = ({ 
  isDark, 
  onClick, 
  text, 
  style = '', 
  fullWidth = false 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden ${style} ${
        fullWidth ? 'w-full' : ''
      } border ${
        isDark
          ? 'border-blue-600 text-blue-400 hover:bg-blue-900/30'
          : 'border-blue-500 text-blue-600 hover:bg-blue-50'
      } hover:scale-105`}
      aria-label={text}
    >
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <span className="font-semibold">{text}</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};

const FinancePage: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const [loanAmount, setLoanAmount] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(5.99);
  const [termMonths, setTermMonths] = useState<number>(60);

  // Use the custom finance hook
  const { financeData, loading, error, refresh } = useFinance();

  const { 
    page, 
    offers, 
    faqs, 
    partners, 
    documents, 
    calculators 
  } = financeData;

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    
    if (monthlyRate > 0) {
      return principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
             (Math.pow(1 + monthlyRate, termMonths) - 1);
    } else {
      return principal / termMonths;
    }
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalInterest = (monthlyPayment * termMonths) - (loanAmount - downPayment);
  const totalCost = monthlyPayment * termMonths + downPayment;

  // Button click handlers
  const handleCheckEligibility = () => {
    console.log('Check eligibility clicked');
    // Add your logic here
  };

  const handleScheduleCall = () => {
    console.log('Schedule call clicked');
    // Add your logic here
  };

  const handleLiveChat = () => {
    console.log('Live chat clicked');
    // Add your logic here
  };

  const handleApplyNow = () => {
    console.log('Apply now clicked');
    // Add your logic here
  };

  const handleRequestCallback = () => {
    console.log('Request callback clicked');
    // Add your logic here
  };

  const handleTryCalculator = (calculatorId: number) => {
    console.log('Try calculator clicked:', calculatorId);
    // Add your logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <ErrorMessage 
        message="Failed to load finance page"
        error={error || 'Finance page not found'}
        retryText="Try Again"
        onRetry={refresh}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      {/* Hero Section */}
      <FinanceHero 
        title={page.hero_title}
        description={page.hero_description}
        image={page.hero_image}
        isDarkMode={isDarkMode}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Section */}
        <FinanceFeatures 
          title={page.features_title}
          intro={page.features_intro}
          features={page.features}
          isDarkMode={isDarkMode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Left Column - Calculator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Loan Calculator */}
            <FinanceCalculator 
              isDarkMode={isDarkMode}
              loanAmount={loanAmount}
              setLoanAmount={setLoanAmount}
              downPayment={downPayment}
              setDownPayment={setDownPayment}
              interestRate={interestRate}
              setInterestRate={setInterestRate}
              termMonths={termMonths}
              setTermMonths={setTermMonths}
              monthlyPayment={monthlyPayment}
              totalInterest={totalInterest}
              totalCost={totalCost}
              onApplyClick={() => handleApplyNow()}
            />

            {/* Current Offers */}
            <FinanceOffersGrid 
              title={page.offers_section_title || "Current Finance Offers"}
              offers={offers}
              loading={false}
              isDarkMode={isDarkMode}
            />

            {/* Finance Partners */}
            <FinancePartners 
              partners={partners}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Right Column - Info & Docs */}
          <div className="space-y-8">
            {/* Quick Apply Form */}
            <div className={`rounded-2xl p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
            }`}>
              <h3 className="text-xl font-bold mb-4">Quick Finance Check</h3>
              <p className="text-sm mb-4 opacity-80">
                Get pre-approved in minutes without affecting your credit score
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Income ($)</label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="5000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Credit Score</label>
                  <select className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } border`}>
                    <option>Excellent (720+)</option>
                    <option>Good (680-719)</option>
                    <option>Fair (640-679)</option>
                    <option>Below Average (600-639)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Employment Status</label>
                  <select className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } border`}>
                    <option>Employed Full-time</option>
                    <option>Employed Part-time</option>
                    <option>Self-employed</option>
                    <option>Retired</option>
                  </select>
                </div>
                
                <FinanceButton 
                  isDark={isDarkMode}
                  onClick={handleCheckEligibility}
                  text="Check Eligibility"
                  fullWidth
                />
              </div>
            </div>

            {/* Finance Documents */}
            <FinanceDocuments 
              documents={documents}
              isDarkMode={isDarkMode}
            />

            {/* FAQ Preview */}
            <FinanceFAQs 
              title={page.faq_section_title || "Frequently Asked Questions"}
              faqs={faqs.slice(0, 5)}
              isDarkMode={isDarkMode}
              showViewAll={faqs.length > 5}
            />

            {/* Call to Action */}
            <div className={`rounded-2xl p-6 text-center ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/30' 
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
            }`}>
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-sm mb-4 opacity-80">
                Our finance specialists are here to help you
              </p>
              <div className="space-y-3">
                <FinanceButton 
                  isDark={isDarkMode}
                  onClick={handleScheduleCall}
                  text="Schedule Call"
                  fullWidth
                />
                <FinanceButtonSecondary
                  isDark={isDarkMode}
                  onClick={handleLiveChat}
                  text="Live Chat"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Calculators Section */}
        {page.show_loan_calculator && calculators && calculators.length > 0 && (
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
        )}

        {/* Testimonial Section */}
        <div className={`mt-16 rounded-2xl p-8 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
            : 'bg-gradient-to-r from-gray-50 to-gray-100'
        }`}>
          <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Johnson",
                car: "Tesla Model 3",
                quote: "The financing process was seamless. Got approved in 24 hours with a great rate!",
                rating: 5
              },
              {
                name: "Maria Garcia",
                car: "Ford Mustang Mach-E",
                quote: "Flexible terms and transparent pricing. Highly recommend their finance team.",
                rating: 5
              },
              {
                name: "David Chen",
                car: "BMW i4",
                quote: "Best rates in town. Saved me hundreds compared to other lenders.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                isDarkMode 
                  ? 'bg-gray-700/50' 
                  : 'bg-white'
              }`}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm opacity-70">{testimonial.car} Owner</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Drive Your Dream EV?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-80">
            Start your financing application today and get approved in as little as 30 minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <FinanceButton 
              isDark={isDarkMode}
              onClick={handleApplyNow}
              text="Apply Now"
              style="px-8 py-3 text-lg"
            />
            <FinanceButtonSecondary
              isDark={isDarkMode}
              onClick={handleRequestCallback}
              text="Request Callback"
              style="px-8 py-3 text-lg"
            />
          </div>
          <p className="mt-4 text-sm opacity-70">
            No impact on credit score • No obligation • 100% online
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;