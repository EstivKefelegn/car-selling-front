// components/BuyDropdown.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkModeStore } from '../../../store/useDarkModeStore';

interface Manufacturer {
  id: number;
  name: string;
  logo_url?: string;
  country: string;
  founded_year: number;
  is_ev_only: boolean;
  electric_cars?: number[]; // Add this if available from API
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

  // Group manufacturers alphabetically
  const groupedManufacturers = manufacturers.reduce((acc, manufacturer) => {
    const firstLetter = manufacturer.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(manufacturer);
    return acc;
  }, {} as Record<string, Manufacturer[]>);

  const sortedLetters = Object.keys(groupedManufacturers).sort();

  return (
    <div className="max-h-[70vh] overflow-y-auto
    [&::-webkit-scrollbar]:hidden 
    [-ms-overflow-style:'none'] 
    [scrollbar-width:'none']">
      {/* Browse All Cars Button */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <Link
          to="/cars"
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isDarkMode
              ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50'
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }`}
          onClick={onItemClick}
        >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse All Cars
          </div>
          <span className="text-xs opacity-75">
            {manufacturers.reduce((total, m) => total + (m.electric_cars?.length || 0), 0)} cars
          </span>
        </Link>
      </div>

      {/* Manufacturers List */}
      <div className="p-2">
        {sortedLetters.map(letter => (
          <div key={letter} className="mb-3 last:mb-0">
            <div className={`text-xs font-semibold px-3 py-1.5 ${
              isDarkMode ? 'text-gray-400 bg-gray-800/50' : 'text-gray-500 bg-gray-100'
            } rounded-t-lg`}>
              {letter}
            </div>
            <div className="space-y-1">
              {groupedManufacturers[letter].map(manufacturer => (
                <Link
                  key={manufacturer.id}
                  to={`/cars?manufacturer=${encodeURIComponent(manufacturer.name)}`}
                  className={`group flex items-center px-3 py-2.5 text-sm transition-all duration-200 rounded-lg ${
                    isDarkMode 
                      ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                  }`}
                  onClick={onItemClick}
                >
                  {/* Manufacturer Logo */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    isDarkMode 
                      ? 'bg-gray-800 group-hover:bg-gray-700' 
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  } transition-colors`}>
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
                            fallback.className = `font-bold text-xs ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`;
                            fallback.textContent = manufacturer.name.charAt(0);
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      <span className={`font-bold text-xs ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {manufacturer.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  
                  {/* Manufacturer Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate flex items-center gap-2">
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
                    <div className={`text-xs mt-0.5 flex items-center ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span className="truncate">{manufacturer.country}</span>
                      <span className="mx-1">•</span>
                      <span>{manufacturer.founded_year}</span>
                    </div>
                  </div>
                  
                  {/* Car Count */}
                  <div className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-300' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {manufacturer.electric_cars?.length || 0}
                  </div>
                  
                  {/* Arrow Indicator */}
                  <svg className={`ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* New Arrivals Link */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/new-cars"
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isDarkMode
              ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/50'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
          onClick={onItemClick}
        >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Arrivals
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            isDarkMode
              ? 'bg-blue-900/50 text-blue-300'
              : 'bg-blue-100 text-blue-700'
          }`}>
            NEW
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BuyDropdown;