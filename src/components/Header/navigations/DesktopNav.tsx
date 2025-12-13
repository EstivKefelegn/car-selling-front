// components/navigation/DesktopNav.tsx
import React from 'react';
import type { MenuItem, DropdownData, DropdownKey } from './types';
import BuyDropdown from './BuyDropdown';

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
  const isDropdownKey = (key: string): key is DropdownKey => {
    return ['buy', 'newCars', 'services', 'more'].includes(key);
  };

  const renderDropdownContent = (key: string): React.ReactNode => {
    if (!isDropdownKey(key)) return null;
    const items = dropdownData[key];

    // Special rendering for Buy dropdown with manufacturers
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

    // For other dropdowns (newCars, services, more)
    if (items.length === 0) {
      return (
        <div className="px-4 py-8 text-center">
          <div className={`animate-spin rounded-full h-6 w-6 border-b-2 mx-auto mb-2 ${
            isDarkMode ? 'border-gray-400' : 'border-gray-600'
          }`}></div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading menu items...
          </p>
        </div>
      );
    }

    return items.map(item => (
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
        {item.name}
      </a>
    ));
  };

  return (
    <nav className="hidden lg:flex items-center">
      {menuItems.map(item => (
        <div
          key={item.key}
          className="relative mr-3"
          onMouseEnter={() => item.hasDropdown && onToggleDropdown(item.key)}
        >
          {item.hasDropdown ? (
            <button
              type="button"
              className={`group flex items-center px-4 py-3 font-medium rounded-xl transition-all duration-300 overflow-hidden cursor-pointer ${
                isDarkMode 
                  ? `text-gray-300 hover:text-white ${
                      activeDropdown === item.key 
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg' 
                        : 'hover:bg-gray-800/50'
                    }` 
                  : `text-gray-700 hover:text-gray-900 ${
                      activeDropdown === item.key 
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg' 
                        : 'hover:bg-gray-100'
                    }`
              }`}
              onClick={() => onToggleDropdown(item.key)}
            >
              <div className="relative z-10 flex items-center">
                {item.name}
                {item.key === 'buy' && manufacturers && (
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {manufacturers.length}
                  </span>
                )}
                <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                  activeDropdown === item.key ? 'rotate-180' : ''
                } ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </button>
          ) : (
            <a
              href={item.link}
              className={`group relative px-4 py-3 font-medium rounded-xl transition-all duration-300 overflow-hidden cursor-pointer ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="relative z-10">{item.name}</div>
            </a>
          )}

          {item.hasDropdown && activeDropdown === item.key && (
            <div
              className={`absolute top-full left-0 mt-2 rounded-2xl shadow-2xl py-3 z-50
              backdrop-blur-xl animate-fadeIn border transition-all duration-300
              ${isDarkMode ? 'bg-gray-900/70 border-gray-700' : 'bg-white/70 border-gray-300'}
              ${item.key === 'buy' ? 'w-80' : 'w-64'}`}
            >
              {renderDropdownContent(item.key)}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNav;