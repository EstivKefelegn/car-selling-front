// pages/FinancePage.tsx
import React, { useState } from 'react';
import useFinance from '../../hooks/finance/useFinance';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import LoadingState from './Sections/LoadingState';
import ErrorState from './Sections/ErrorState';
import FinanceHero from './FinanceHero';
import FinanceFeatures from './FinanceFeatures';
import MainContentLayout from './Sections/MainContentLayout';
import AdditionalCalculators from './Sections/AdditionalCalculators';
import TestimonialSection from './Sections/TestimonialSection';
import CallToActionSection from './Sections/CallToActionSection';
import { calculateMonthlyPayment } from '../../utils/Calculations';

const FinancePage: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const [loanAmount, setLoanAmount] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(5.99);
  const [termMonths, setTermMonths] = useState<number>(60);

  // Use the custom finance hook
  const { financeData, loading, error, refresh } = useFinance();

  const { page, offers, faqs, partners, documents, calculators } = financeData;

  const monthlyPayment = calculateMonthlyPayment(loanAmount, downPayment, interestRate, termMonths);
  const totalInterest = (monthlyPayment * termMonths) - (loanAmount - downPayment);
  const totalCost = monthlyPayment * termMonths + downPayment;

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error || !page) {
    return <ErrorState error={error || 'Finance page not found'} onRetry={refresh} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      <FinanceHero 
        title={page.hero_title}
        description={page.hero_description}
        image={page.hero_image}
        isDarkMode={isDarkMode}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FinanceFeatures 
          title={page.features_title}
          intro={page.features_intro}
          features={page.features}
          isDarkMode={isDarkMode}
        />

        <MainContentLayout 
          partners={partners}
          documents={documents}
          faqs={faqs}
          faqTitle={page.faq_section_title}
          isDarkMode={isDarkMode}
        />

        {page.show_loan_calculator && calculators && calculators.length > 0 && (
          <AdditionalCalculators 
            calculators={calculators}
            isDarkMode={isDarkMode}
          />
        )}

        <TestimonialSection isDarkMode={isDarkMode} />

        <CallToActionSection isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default FinancePage;