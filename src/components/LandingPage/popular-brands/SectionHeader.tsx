import React from 'react';
import { Car } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SectionHeaderProps {
  isDarkMode: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Car size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
        <h3 className={`text-lg font-semibold ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {t('popular_brands')}
        </h3>
      </div>
    </div>
  );
};

export default SectionHeader;