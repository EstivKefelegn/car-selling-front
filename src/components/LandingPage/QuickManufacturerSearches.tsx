// components/QuickManufacturerSearches.tsx
import React, { useState } from 'react';
import useManufacturer, { type Manufacturer, type ManufacturerQuery } from '../../hooks/useManufacturers';
import { useDarkModeStore } from '../../store/useDarkModeStore';

interface QuickManufacturerSearchesProps {
  title?: string;
  maxItems?: number;
  onManufacturerClick?: (manufacturer: Manufacturer) => void;
}

const QuickManufacturerSearches: React.FC<QuickManufacturerSearchesProps> = ({
  title = "Quick Searches",
  maxItems = 12,
  onManufacturerClick
}) => {
  const { isDarkMode } = useDarkModeStore();
  const [showAll, setShowAll] = useState(false);

  // Set up manufacturer query to fetch all manufacturers
  const manufacturerQuery: ManufacturerQuery = {
    name: '', // Empty string to get all manufacturers
    is_ev_only: undefined,
    country: undefined,
    founded_year: undefined
  };

  const { data: manufacturers, loading, error } = useManufacturer(manufacturerQuery);

  const handleManufacturerClick = (manufacturer: Manufacturer) => {
    if (onManufacturerClick) {
      onManufacturerClick(manufacturer);
    } else {
      // Default behavior: navigate to manufacturer page
      window.location.href = `/all-cars?manufacturer=${encodeURIComponent(manufacturer.name)}`;
    }
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  // Filter manufacturers to show only non-EV only manufacturers if needed
  const filteredManufacturers = manufacturers?.filter(manufacturer => !manufacturer.is_ev_only) || [];
  const displayManufacturers = showAll ? filteredManufacturers : filteredManufacturers.slice(0, maxItems);

  if (error) {
    return (
      <div className={`rounded-2xl p-8 text-center ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
      } backdrop-blur-sm`}>
        <p className={isDarkMode ? 'text-red-300' : 'text-red-600'}>
          Failed to load manufacturers
        </p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Browse cars by popular manufacturers
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
              isDarkMode ? 'border-gray-400' : 'border-gray-600'
            }`}></div>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Loading manufacturers...
            </p>
          </div>
        )}

        {/* Manufacturer Grid */}
        {!loading && displayManufacturers.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {displayManufacturers.map((manufacturer) => (
                <button
                  key={manufacturer.id}
                  onClick={() => handleManufacturerClick(manufacturer)}
                  className={`group relative p-4 rounded-xl transition-all duration-300 overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gray-800/50 hover:bg-gray-800/70 text-white' 
                      : 'bg-white/80 hover:bg-white text-gray-800 border border-gray-200'
                  } hover:scale-105 hover:shadow-xl`}
                  aria-label={`Search ${manufacturer.name} cars`}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    isDarkMode 
                      ? 'from-transparent via-gray-700/20 to-transparent' 
                      : 'from-transparent via-gray-100/20 to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="text-lg font-semibold mb-2">{manufacturer.name}</div>
                    <div className={`text-sm flex items-center justify-between ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <span>{manufacturer.country}</span>
                      {manufacturer.founded_year && (
                        <span className={`px-2 py-1 rounded text-xs ${
                          isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                        }`}>
                          {manufacturer.founded_year}
                        </span>
                      )}
                    </div>
                    {manufacturer.is_ev_only && (
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          isDarkMode 
                            ? 'bg-green-900/30 text-green-300' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          EV Only
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Show More/Less Button */}
            {filteredManufacturers.length > maxItems && (
              <div className="text-center">
                <button
                  onClick={handleShowAll}
                  className={`group relative px-8 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gray-800/60 text-white hover:bg-gray-800/80' 
                      : 'bg-white/80 text-gray-800 hover:bg-white border border-gray-300'
                  }`}
                >
                  <div className="relative z-10 font-medium">
                    {showAll ? 'Show Less' : `Show All ${filteredManufacturers.length} Manufacturers`}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            )}

            {/* Manufacturer Count */}
            {/* <div className={`text-center mt-6 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {filteredManufacturers.length} manufacturers available
            </div> */}
          </>
        )}

        {/* Empty State */}
        {!loading && displayManufacturers.length === 0 && (
          <div className="text-center">
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              No manufacturers found
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickManufacturerSearches;