import React from 'react';
import FindCarsButton from '../../../utils/FindCars';
import { buildImageUrl } from '../../../utils/imageUrlBuilder';
import { useTranslation } from 'react-i18next';

interface ActionButtonsProps {
  car: any;
  isDarkMode: boolean;
  onContactClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  car, 
  isDarkMode, 
  onContactClick 
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <FindCarsButton
          isDark={isDarkMode}
          text={t('actionButtons.contactSeller')}
          onClick={onContactClick}
        />

        {car.brochure_url && (
          <a
            href={buildImageUrl(car.brochure_url)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
          >
            {t('actionButtons.downloadBrochure')}
          </a>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;