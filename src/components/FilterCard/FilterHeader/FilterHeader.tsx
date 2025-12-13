// components/FilterCard/FilterHeader.tsx
import React from 'react';

interface FilterHeaderProps {
  showTitle: boolean;
  activeFilterCount: number;
  carsLoading: boolean;
  carsCount: number;
  isDarkMode: boolean;
  onClearAll: () => void;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  showTitle,
  activeFilterCount,
  carsLoading,
  carsCount,
  isDarkMode,
  onClearAll
}) => {
  if (!showTitle) return null;

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Filter Cars
        </h3>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {carsLoading ? 'Loading cars...' : `${carsCount} cars available`}
          {activeFilterCount > 0 && ` • ${activeFilterCount} active filter${activeFilterCount !== 1 ? 's' : ''}`}
        </p>
      </div>
      {activeFilterCount > 0 && (
        <button
          onClick={onClearAll}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear All
        </button>
      )}
    </div>
  );
};

export default FilterHeader;