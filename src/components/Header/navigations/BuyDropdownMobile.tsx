// components/BuyDropdownMobile.tsx
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
  electric_cars?: number[];
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

  // Function to generate search URL with manufacturer filter
  const getManufacturerSearchUrl = (manufacturerName: string) => {
    return `/cars?search=${encodeURIComponent(manufacturerName)}`;
  };

  // Function to get filter URL
  const getFilterUrl = (params: Record<string, string>) => {
    const queryString = new URLSearchParams(params).toString();
    return `/cars?${queryString}`;
  };

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

  // Group manufacturers alphabetically for mobile (optional)
  const groupedManufacturers = manufacturers.reduce((acc, manufacturer) => {
    const firstLetter = manufacturer.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(manufacturer);
    return acc;
  }, {} as Record<string, Manufacturer[]>);

  const sortedLetters = Object.keys(groupedManufacturers).sort();

  // Get unique countries
  const countries = Array.from(new Set(manufacturers.map(m => m.country))).sort();

  // Get total car count
  const totalCarCount = manufacturers.reduce((total, m) => total + (m.electric_cars?.length || 0), 0);

  return (
    <div className="max-h-[70vh] overflow-y-auto
    [&::-webkit-scrollbar]:hidden 
    [-ms-overflow-style:'none'] 
    [scrollbar-width:'none']">
      
      {/* Quick Filter Links for Mobile */}
      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-1.5">
          {/* Browse All Cars */}
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
              {totalCarCount} cars
            </span>
          </Link>

          {/* EV Only Filter */}
          <Link
            to={getFilterUrl({ is_ev_only: 'true' })}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? 'bg-green-900/30 text-green-300 hover:bg-green-800/50'
                : 'bg-green-50 text-green-700 hover:bg-green-100'
            }`}
            onClick={onItemClick}
          >
            <div className="flex items-center">
              <span className="mr-2">⚡</span>
              EV Only Brands
            </div>
            <span className="text-xs opacity-75">
              {manufacturers.filter(m => m.is_ev_only).length} brands
            </span>
          </Link>
        </div>
      </div>

      {/* Countries Filter - Quick Access for Mobile */}
      {countries.length > 0 && (
        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`text-xs font-semibold mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Filter by Country
          </h3>
          <div className="flex flex-wrap gap-1">
            {countries.slice(0, 8).map(country => (
              <Link
                key={country}
                to={getFilterUrl({ country })}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={onItemClick}
              >
                {country}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Manufacturers List with Alphabetical Sections */}
      <div className="py-1">
        {sortedLetters.map(letter => (
          <div key={letter} className="mb-2 last:mb-0">
            {/* Letter Header */}
            <div className={`text-xs font-semibold px-3 py-1.5 sticky top-0 z-10 ${
              isDarkMode ? 'text-gray-400 bg-gray-900' : 'text-gray-500 bg-gray-50'
            }`}>
              {letter}
            </div>
            
            {/* Manufacturers in this letter */}
            <div className="space-y-0.5">
              {groupedManufacturers[letter].map(manufacturer => (
                <Link
                  key={manufacturer.id}
                  to={getManufacturerSearchUrl(manufacturer.name)}
                  className={`flex items-center px-3 py-2.5 text-sm transition-all duration-200 ${
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
                    <div className="font-medium truncate flex items-center gap-1.5">
                      {manufacturer.name}
                      {manufacturer.is_ev_only && (
                        <span className={`text-xs px-1 py-0.5 rounded-full ${
                          isDarkMode 
                            ? 'bg-green-900/30 text-green-300' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          ⚡
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
                  <div className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-300' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {manufacturer.electric_cars?.length || 0}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Quick Links for Mobile */}
      <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-1.5">
          {/* New Arrivals */}
          <Link
            to={getFilterUrl({ sort_by: 'year', sort_order: 'desc' })}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-colors ${
              isDarkMode
                ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/50'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
            onClick={onItemClick}
          >
            <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs font-medium">New Arrivals</span>
          </Link>

          {/* Popular */}
          <Link
            to="/cars?sort_by=popularity&sort_order=desc"
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-colors ${
              isDarkMode
                ? 'bg-orange-900/30 text-orange-300 hover:bg-orange-800/50'
                : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
            }`}
            onClick={onItemClick}
          >
            <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-xs font-medium">Popular</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyDropdownMobile;