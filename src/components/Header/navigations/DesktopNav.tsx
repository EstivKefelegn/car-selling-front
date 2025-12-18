// components/navigation/DesktopNav.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MenuItem, DropdownData, DropdownKey } from './types';
import BuyDropdown from './BuyDropdown';
import LanguageSelector from './LanguageSelector';

interface DesktopNavProps {
  menuItems: MenuItem[];
  manufacturers: any[] | null;
  manufacturersLoading: boolean;
  manufacturersError: any;
  isDarkMode: boolean;
  activeDropdown: string | null;
  dropdownData: DropdownData;
  onToggleDropdown: (menu: string) => void;
  onItemClick?: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  menuItems,
  manufacturers,
  manufacturersLoading,
  manufacturersError,
  isDarkMode,
  activeDropdown,
  dropdownData,
  onToggleDropdown,
  onItemClick
}) => {
  const { t } = useTranslation();

  const isDropdownKey = (key: string): key is DropdownKey => {
    return ['buy', 'newCars', 'services', 'more'].includes(key);
  };

  const renderDropdownContent = (key: string): React.ReactNode => {
    if (!isDropdownKey(key)) return null;

    const items = dropdownData[key];

    if (key === 'buy') {
      return (
        <BuyDropdown
          manufacturers={manufacturers}
          manufacturersLoading={manufacturersLoading}
          manufacturersError={manufacturersError}
          onItemClick={onItemClick}
        />
      );
    }

    let displayItems = [...items];

    if (key === 'more') {
      const hasAbout = items.some(
        item =>
          item.link === '/about' ||
          item.name.toLowerCase().includes('about')
      );

      if (!hasAbout) {
        displayItems = [
          {
            id: 'about-link',
            name: t('about'),
            link: '/about',
          },
          ...displayItems,
        ];
      }
    }

    if (displayItems.length === 0) {
      return (
        <div className="px-4 py-8 text-center">
          <div
            className={`animate-spin rounded-full h-6 w-6 border-b-2 mx-auto mb-2 ${
              isDarkMode ? 'border-gray-400' : 'border-gray-600'
            }`}
          />
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t('common.loading')}
          </p>
        </div>
      );
    }

    return displayItems.map(item => (
      <a
        key={item.id}
        href={item.link}
        className={`block px-4 py-3 text-sm transition-all duration-300 hover:pl-6 rounded-lg ${
          isDarkMode
            ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
        onClick={onItemClick}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {t(item.name)}
      </a>
    ));
  };

  return (
    <nav className="hidden lg:flex items-center">
      {menuItems.map(item => {
        const isNewCarsItem = item.key === 'newCars';

        return (
          <div
            key={item.key}
            className="relative mr-3"
            onMouseEnter={() =>
              item.hasDropdown &&
              !isNewCarsItem &&
              onToggleDropdown(item.key)
            }
            onMouseLeave={() =>
              item.hasDropdown &&
              !isNewCarsItem &&
              activeDropdown === item.key &&
              onToggleDropdown(item.key)
            }
          >
            {isNewCarsItem ? (
              <a
                href="/new-cars"
                className={`group relative px-4 py-3 font-medium rounded-xl transition-all duration-300 flex items-center ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={onItemClick}
              >
                <span>{t(item.name)}</span>
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  }`}
                >
                  {t('new')}
                </span>
              </a>
            ) : item.hasDropdown ? (
              <button
                type="button"
                onClick={() => onToggleDropdown(item.key)}
                className={`group flex items-center px-4 py-3 font-medium rounded-xl transition-all ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {t(item.name)}
                <svg
                  className={`ml-2 w-4 h-4 transition-transform ${
                    activeDropdown === item.key ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <a
                href={item.link}
                className={`px-4 py-3 font-medium rounded-xl transition-all ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={onItemClick}
              >
                {t(item.name)}
              </a>
            )}

            {!isNewCarsItem &&
              item.hasDropdown &&
              activeDropdown === item.key && (
                <div
                  className={`absolute top-full left-0 mt-2 rounded-2xl shadow-2xl py-3 z-50 ${
                    isDarkMode
                      ? 'bg-gray-900/70 border-gray-700'
                      : 'bg-white/70 border-gray-300'
                  } ${item.key === 'buy' ? 'w-80' : 'w-64'}`}
                >
                  {renderDropdownContent(item.key)}
                </div>
              )}
          </div>
        );
      })}

      <LanguageSelector
      isDarkMode={isDarkMode}
      onItemClick={onItemClick}
    />
    </nav>
  );
};

export default DesktopNav;
