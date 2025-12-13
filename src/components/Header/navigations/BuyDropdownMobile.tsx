// components/BuyDropdownMobile.tsx
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

interface BuyDropdownMobileProps {
  manufacturers: Manufacturer[] | null;
  manufacturersLoading: boolean;
  manufacturersError: any;
  onItemClick?: () => void;
}

const BuyDropdownMobile: React.FC<BuyDropdownMobileProps> = ({
  manufacturers,
  manufacturersLoading,
  manufacturersError,
  onItemClick
}) => {
  const { isDarkMode } = useDarkModeStore();

  if (manufacturersLoading) {
    return (
      <div className="text-center py-4">
        <div className={`animate-spin rounded-full h-5 w-5 border-b-2 mx-auto mb-2 ${
          isDarkMode ? 'border-gray-400' : 'border-gray-600'
        }`}></div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          Loading manufacturers...
        </p>
      </div>
    );
  }

  if (manufacturersError) {
    return (
      <div className="text-center py-4">
        <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
          Failed to load
        </p>
      </div>
    );
  }

  if (!manufacturers || manufacturers.length === 0) {
    return (
      <div className="text-center py-4">
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          No manufacturers
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {manufacturers.map(manufacturer => (
        <a
          key={manufacturer.id}
          href={`/manufacturers/${manufacturer.id}`}
          className={`flex items-center gap-3 py-2.5 px-3 text-sm rounded-lg transition-all duration-200 ${
            isDarkMode 
              ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
          onClick={onItemClick}
        >
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isDarkMode 
              ? 'bg-gray-800' 
              : 'bg-gray-100'
          }`}>
            {manufacturer.logo_url ? (
              <img 
                src={manufacturer.logo_url} 
                alt={manufacturer.name}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('span');
                    fallback.className = `text-sm font-bold ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`;
                    fallback.textContent = manufacturer.name.charAt(0);
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              <span className={`text-sm font-bold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {manufacturer.name.charAt(0)}
              </span>
            )}
          </div>
          
          <div>
            <div className="font-medium">{manufacturer.name}</div>
            <div className={`text-xs mt-1 flex items-center space-x-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span>{manufacturer.country}</span>
              {manufacturer.is_ev_only && (
                <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                  isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  EV
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default BuyDropdownMobile;