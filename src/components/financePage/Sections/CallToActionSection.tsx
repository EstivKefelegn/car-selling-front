// pages/finance/components/CallToActionSection.tsx
import React from 'react';
import FinanceButton from './FinanceButton';
import FinanceButtonSecondary from './FinanceButtonSecondary';

interface CallToActionSectionProps {
  isDarkMode: boolean;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ isDarkMode }) => {
  const handleApplyNow = () => {
    console.log('Apply now clicked');
    // Add your logic here
  };

  const handleRequestCallback = () => {
    console.log('Request callback clicked');
    // Add your logic here
  };

  return (
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
  );
};

export default CallToActionSection;