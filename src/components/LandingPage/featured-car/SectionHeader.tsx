import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SectionHeaderProps {
  isDarkMode: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t('featuredCars')}
      </h2>
      <Link
        to="/all-cars"
        className={`text-sm font-medium transition-colors ${
          isDarkMode 
            ? 'text-gray-400 hover:text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {t('viewAll')}
      </Link>
    </div>
  );
};

export default SectionHeader;
