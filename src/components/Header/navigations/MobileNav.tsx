// components/navigation/MobileNav.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MenuItem, DropdownData, DropdownKey } from './types';
import BuyDropdownMobile from './BuyDropdownMobile';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

interface MobileNavProps {
  menuItems: MenuItem[];
  manufacturers: any[] | null;
  manufacturersLoading: boolean;
  manufacturersError: any;
  isDarkMode: boolean;
  activeDropdown: string | null;
  dropdownData: DropdownData;
  isMobileMenuOpen: boolean;
  onToggleDropdown: (menu: string) => void;
  onCloseMobileMenu: () => void;
  onCloseAllDropdowns: () => void;
  onMobileItemClick: (item: MenuItem) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  menuItems,
  manufacturers,
  manufacturersLoading,
  manufacturersError,
  isDarkMode,
  activeDropdown,
  dropdownData,
  isMobileMenuOpen,
  onCloseMobileMenu,
  onCloseAllDropdowns,
  onMobileItemClick
}) => {
  const { t } = useTranslation();

  const isDropdownKey = (key: string): key is DropdownKey => {
    return ['buy', 'newCars', 'services', 'more'].includes(key);
  };

  const renderMobileDropdownContent = (key: string): React.ReactNode => {
    if (!isDropdownKey(key)) return null;
    const items = dropdownData[key];

    // Special rendering for Buy dropdown in mobile
    if (key === 'buy') {
      return (
        <BuyDropdownMobile
          manufacturers={manufacturers}
          manufacturersLoading={manufacturersLoading}
          manufacturersError={manufacturersError}
          onItemClick={() => {
            onCloseMobileMenu();
            onCloseAllDropdowns();
          }}
        />
      );
    }

    let displayItems = [...items];

    // Add "About" to "more" dropdown if it doesn't exist (same as DesktopNav)
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

    // For other dropdowns
    if (displayItems.length === 0) {
      return (
        <div className="text-center py-4">
          <div className={`animate-spin rounded-full h-5 w-5 border-b-2 mx-auto mb-2 ${
            isDarkMode ? 'border-gray-400' : 'border-gray-600'
          }`}></div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            {t('common.loading')}
          </p>
        </div>
      );
    }

    return displayItems.map(item => (
      <a
        key={item.id}
        href={item.link}
        className={`block py-2.5 px-3 text-sm rounded-lg transition-all duration-200 hover:pl-6 ${
          isDarkMode 
            ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        onClick={() => {
          onCloseMobileMenu();
          onCloseAllDropdowns();
        }}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {t(item.name)}
      </a>
    ));
  };

  if (!isMobileMenuOpen) return null;

  return (
    <>
      {/* Glass Backdrop */}
      <div 
        className={`fixed inset-0 z-30 lg:hidden backdrop-blur-md transition-all duration-500 ${
          isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'
        }`} 
        onClick={onCloseMobileMenu} 
        aria-hidden="true"
      ></div>
      
      {/* Glass Mobile Menu */}
      <div className={`lg:hidden fixed top-20 right-4 left-4 mx-auto rounded-2xl shadow-2xl z-40 overflow-hidden border transition-all duration-500 animate-fadeIn ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-gray-700' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white backdrop-blur-xl border-gray-300'
      }`}>
        <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
          {menuItems.map(item => {
            // Check if this is the "New Cars" item
            const isNewCarsItem = item.key === 'newCars';
            
            return (
              <div key={`mobile-${item.key}`} className="group">
                {isNewCarsItem ? (
                  // Special handling for New Cars - direct link to /new-cars
                  <a 
                    href="/new-cars"
                    className={`group relative flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-300 overflow-hidden ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`} 
                    onClick={() => {
                      onCloseMobileMenu();
                      onCloseAllDropdowns();
                    }}
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="font-medium">{t(item.name)}</span>
                      {/* New badge for mobile */}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      }`}>
                        {t('new')}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </a>
                ) : item.hasDropdown ? (
                  <button 
                    type="button" 
                    className={`group relative flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-300 overflow-hidden ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`} 
                    onClick={() => onMobileItemClick(item)}
                  >
                    <div className="relative z-10 flex items-center">
                      <span className="font-medium">{t(item.name)}</span>
                      {item.key === 'buy' && manufacturers && (
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {manufacturers.length}
                        </span>
                      )}
                    </div>
                    <div className="relative z-10">
                      <svg className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.key ? 'rotate-180' : ''
                      } ${
                        isDarkMode 
                          ? 'text-gray-400 group-hover:text-white' 
                          : 'text-gray-600 group-hover:text-gray-900'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                ) : (
                  <a 
                    href={item.link} 
                    className={`group relative flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-300 overflow-hidden ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`} 
                    onClick={onCloseMobileMenu}
                  >
                    <div className="relative z-10 font-medium">{t(item.name)}</div>
                    <div className="relative z-10">
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </a>
                )}
                
                {/* Dropdown content for non-new-cars dropdown items */}
                {!isNewCarsItem && item.hasDropdown && activeDropdown === item.key && (
                  <div className={`ml-6 mt-2 rounded-xl p-3 space-y-2 ${
                    isDarkMode 
                      ? 'bg-gray-800/50' 
                      : 'bg-gray-100'
                  }`}>
                    {renderMobileDropdownContent(item.key)}
                  </div>
                )}
              </div>
            );
          })}

          {/* Language Selector for Mobile - Full width */}
          <div className="mt-4 px-3">
            <div className={`w-full rounded-xl p-4 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t('languageSelector.selectLanguage')}
                </span>
              </div>
              <LanguageSelector
                isDarkMode={isDarkMode}
                onItemClick={onCloseMobileMenu}
              />
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className={`border-t mt-4 pt-4 px-4 space-y-3 ${
            isDarkMode 
              ? 'border-gray-700' 
              : 'border-gray-300'
          }`}>
            
            {/* Find Cars Button Mobile */}
            <Link to="/all-cars" className="block">
              <button 
                type="button" 
                className={`group relative w-full py-3 font-medium rounded-xl transition-all duration-300 ease-in-out overflow-hidden shadow-xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white' 
                    : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                } hover:scale-[1.02]`} 
                onClick={onCloseMobileMenu}
              >
                <div className="relative z-10 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="font-semibold">{t('findCars')}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;