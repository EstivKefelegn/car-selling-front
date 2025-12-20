// components/navigation/LanguageSelector.tsx
import React from 'react';
import { useLanguageStore } from '../../../store/useLanguageStore';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  isDarkMode: boolean;
  onItemClick?: () => void;
}


const LANGUAGES = [
  { code: 'en', labelKey: 'languageSelector.english', flag: '🇺🇸' },
  { code: 'am', labelKey: 'languageSelector.amharic', flag: '🇪🇹' }
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isDarkMode,
  onItemClick
}) => {
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLang =
    LANGUAGES.find(lang => lang.code === language) ?? LANGUAGES[0];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
    onItemClick?.();
  };

  return (
    <div className="relative ml-3">
      <button
        type="button"
        onClick={() => setIsOpen(o => !o)}
        aria-label={t('languageSelector.selectLanguage')}
        className={`flex items-center px-4 py-3 rounded-xl ${
          isDarkMode
            ? 'text-gray-300 hover:bg-gray-800/50'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="mr-2 text-lg">{currentLang.flag}</span>
        <span className="mr-2">{t(currentLang.labelKey)}</span>
        <svg className={`w-4 h-4 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-2xl py-3 shadow-xl z-20 ${
          isDarkMode ? 'bg-gray-900/70' : 'bg-white/70'
        }`}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex w-full items-center px-4 py-3 ${
                language === lang.code
                  ? isDarkMode
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-900'
                  : isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3 text-lg">{lang.flag}</span>
              <span>{t(lang.labelKey)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
