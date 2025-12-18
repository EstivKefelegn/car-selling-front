// pages/finance/components/HelpSection.tsx
import React from 'react';
import FinanceButton from './FinanceButton';
import FinanceButtonSecondary from './FinanceButtonSecondary';

interface HelpSectionProps {
  isDarkMode: boolean;
}

const HelpSection: React.FC<HelpSectionProps> = ({ isDarkMode }) => {
  const handleScheduleCall = () => {
    console.log('Schedule call clicked');
    // Add your logic here
  };

  const handleLiveChat = () => {
    console.log('Live chat clicked');
    // Add your logic here
  };

  return (
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
  );
};

export default HelpSection;