// components/Footer/BrandSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/logo.png';
import { SOCIAL_LINKS } from './constants';

interface BrandSectionProps {
  isDarkMode: boolean;
}

const BrandSection: React.FC<BrandSectionProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <img
          src={Logo}
          alt={`${t('footer.brand_name')} Logo`}
          className="h-10 sm:h-10 md:h-24 lg:h-15 w-auto object-contain"
        />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('footer.brand_name')}
        </h2>
      </div>

      <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {t('footer.tagline')}
      </p>

      <div className="flex gap-3">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-md transition-colors ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-white hover:bg-gray-100 text-gray-600 shadow-sm'
            }`}
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default BrandSection;
