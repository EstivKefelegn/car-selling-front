import React from 'react';
import FindCarsButton from '../../../utils/FindCarsButton';
import { useTranslation } from 'react-i18next';

interface CTAButtonsProps {
  isDarkMode: boolean;
  onBrowseInventory: () => void;
  onScheduleTestDrive: () => void;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({
  isDarkMode,
  onBrowseInventory,
  onScheduleTestDrive
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2 sm:px-0">
      <FindCarsButton 
        isDark={isDarkMode}
        onClick={onBrowseInventory}
        className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm sm:text-base md:text-lg"
      >
        {t('browseInventory')}
      </FindCarsButton>
      
      <button 
        onClick={onScheduleTestDrive}
        className={`group relative w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg sm:rounded-xl font-medium sm:font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 border-2 shadow overflow-hidden ${
          isDarkMode 
            ? 'border-gray-600 text-gray-300 hover:bg-gray-800/60 hover:text-white backdrop-blur-sm' 
            : 'border-gray-300 text-gray-800 hover:bg-white/80 hover:text-gray-900 backdrop-blur-sm'
        }`}
      >
        <div className="relative z-10">{t('ourLocation')}</div>
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent text ${
          isDarkMode ? 'via-white/10' : 'via-gray-900/10'
        } to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700`}></div>
      </button>
    </div>
  );
};

export default CTAButtons;
