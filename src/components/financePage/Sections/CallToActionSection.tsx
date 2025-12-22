import React from 'react';
import { useTranslation } from 'react-i18next';
import FinanceButton from './FinanceButton';
import FinanceButtonSecondary from './FinanceButtonSecondary';

interface CallToActionSectionProps {
  isDarkMode: boolean;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  const handleApplyNow = () => {
    console.log('Apply now clicked');
  };

  const handleRequestCallback = () => {
    console.log('Request callback clicked');
  };

  return (
    <div className="mt-16 text-center">
      <h2 className="text-3xl font-bold mb-4">
        {t('READY_TO_DRIVE')}
      </h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto opacity-80">
        {t('FINANCING_DESCRIPTION')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       
        <FinanceButtonSecondary
          isDark={isDarkMode}
          onClick={handleRequestCallback}
          text={t('REQUEST_CALLBACK')}
          style="px-8 py-3 text-lg"
        />
      </div>
      <p className="mt-4 text-sm opacity-70">
        {t('NO_CREDIT_IMPACT')}
      </p>
    </div>
  );
};

export default CallToActionSection;
