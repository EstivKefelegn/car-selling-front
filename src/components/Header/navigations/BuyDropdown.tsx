// components/BuyDropdown.tsx
import React from 'react';
import { useDarkModeStore } from '../../../store/useDarkModeStore';

interface Manufacturer {
  id: number;
  name: string;
  logo_url?: string;
  country: string;
  founded_year: number;
  is_ev_only: boolean;
}

interface BuyDropdownProps {
  manufacturers: Manufacturer[] | null;
  manufacturersLoading: boolean;
  manufacturersError: any;
  onItemClick?: () => void;
}

const BuyDropdown: React.FC<BuyDropdownProps> = ({
  manufacturers,
  manufacturersLoading,
  manufacturersError,
  onItemClick
}) => {
  const { isDarkMode } = useDarkModeStore();

  if (manufacturersLoading) {
    return (
      <div className="px-4 py-8 text-center">
        <div className={`animate-spin rounded-full h-6 w-6 border-b-2 mx-auto mb-2 ${
          isDarkMode ? 'border-gray-400' : 'border-gray-600'
        }`}></div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading manufacturers...
        </p>
      </div>
    );
  }

  if (manufacturersError) {
    return (
      <div className="px-4 py-8 text-center">
        <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
          Failed to load manufacturers
        </p>
      </div>
    );
  }

  if (!manufacturers || manufacturers.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          No manufacturers found
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto
    [&::-webkit-scrollbar]:hidden 
    [-ms-overflow-style:'none'] 
    [scrollbar-width:'none']">
      <div className={`px-4 py-2 text-xs border-b ${
        isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-300 text-gray-500'
      }`}>
        {manufacturers.length} manufacturers
      </div>
      
      {manufacturers.map(manufacturer => (
        <a
          key={manufacturer.id}
          href={`/manufacturers/${manufacturer.id}`}
          className={`group flex items-center px-4 py-3 text-sm transition-all duration-300 hover:pl-6 rounded-lg ${
            isDarkMode 
              ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={onItemClick}
        >
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            isDarkMode 
              ? 'bg-gray-800 group-hover:bg-gray-700' 
              : 'bg-gray-100 group-hover:bg-gray-200'
          } transition-colors`}>
            {manufacturer.logo_url ? (
              <img 
                src={manufacturer.logo_url} 
                alt={manufacturer.name}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('span');
                    fallback.className = `font-bold ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`;
                    fallback.textContent = manufacturer.name.charAt(0);
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              <span className={`font-bold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {manufacturer.name.charAt(0)}
              </span>
            )}
          </div>
          
          <div className="flex-1">
            <div className="font-medium flex items-center gap-2">
              {manufacturer.name}
              {manufacturer.is_ev_only && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isDarkMode 
                    ? 'bg-green-900/30 text-green-300' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  ⚡ EV
                </span>
              )}
            </div>
            <div className={`text-xs mt-1 flex items-center space-x-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span>{manufacturer.country}</span>
              <span>•</span>
              <span>Since {manufacturer.founded_year}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default BuyDropdown;