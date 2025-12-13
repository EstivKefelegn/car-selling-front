import React from 'react';

interface HeaderSectionProps {
  isDarkMode: boolean;
  activeFilterCount: number;
  filteredCarsCount: number;
  totalCarsCount: number;
  filters: any;
  filterInfo: {
    priceFilterText: string;
    hasColorFilters: boolean;
    exteriorColorsText: string;
    interiorColorsText: string;
    isPriceFilterActive: boolean;
    exteriorColorsCount: number;
    interiorColorsCount: number;
  };
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  isDarkMode,
  activeFilterCount,
  filteredCarsCount,
  totalCarsCount,
  filters,
  filterInfo
}) => {
  return (
    <div className="mb-12 flex flex-col items-center">
      <h2 className={`text-3xl md:text-4xl mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        New Arrival Electric Vehicles
      </h2>
      
      {activeFilterCount > 0 && (
        <div className={`text-sm px-4 py-2 rounded-full mb-4 ${
          isDarkMode 
            ? 'bg-gray-800 text-gray-300' 
            : 'bg-gray-200 text-gray-700'
        }`}>
          Showing {filteredCarsCount} of {totalCarsCount} cars 
          ({activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied)
        </div>
      )}
      
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {filters.manufacturer && (
            <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-800/70 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
              Manufacturer: {filters.manufacturer}
            </span>
          )}
          {filters.model && (
            <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-800/70 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
              Model: {filters.model}
            </span>
          )}
          {filterInfo.isPriceFilterActive && (
            <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-800/70 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
              Price: {filterInfo.priceFilterText}
            </span>
          )}
          {filterInfo.hasColorFilters && (
            <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-800/70 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
              Colors: 
              {filterInfo.exteriorColorsCount > 0 && (
                <span className="ml-1">
                  Exterior: {filterInfo.exteriorColorsText}
                </span>
              )}
              {filterInfo.interiorColorsCount > 0 && (
                <span className="ml-1">
                  Interior: {filterInfo.interiorColorsText}
                </span>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSection;