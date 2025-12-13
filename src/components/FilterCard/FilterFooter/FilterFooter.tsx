import React from 'react';

interface FilterFooterProps {
  activeFilterCount: number;
  onApplyFilters: () => void;
}

const FilterFooter: React.FC<FilterFooterProps> = ({
  activeFilterCount,
  onApplyFilters
}) => {
  return (
    <button
      onClick={onApplyFilters}
      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:scale-105
        bg-gradient-to-r from-gray-800 to-gray-900 text-white group relative`}
    >
      <div className="relative z-10">Apply Filters ({activeFilterCount})</div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
        -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};

export default FilterFooter;