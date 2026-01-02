import React from 'react';
// import { formatPrice } from '../utils/helpers';

interface EmptyStateProps {
  activeFilterCount: number;
  filters: any;
  isDarkMode: boolean;
  priceFilterText: string;
  featuredCars?: any[];
}

const EmptyState: React.FC<EmptyStateProps> = ({
  activeFilterCount,
  filters,
  isDarkMode,
  priceFilterText,
  // featuredCars
}) => {
  const isPriceFilterActive = filters.minPrice !== undefined || filters.maxPrice !== undefined;

  return (
    <div className={`text-center py-12 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <svg className="w-20 h-20 mx-auto mb-6 text-gray-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {activeFilterCount > 0 ? 'No matching cars found' : 'No featured cars available'}
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        {activeFilterCount > 0 
          ? 'Try adjusting your filters to see more results' 
          : 'Check back soon for new featured vehicles'}
      </p>
      
      {activeFilterCount > 0 && (
        <div className={`mt-6 max-w-md mx-auto p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
          <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Active Filters:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.manufacturer && (
              <span 
                className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
              >
                Manufacturer: {filters.manufacturer}
              </span>
            )}
            {filters.model && (
              <span 
                className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
              >
                Model: {filters.model}
              </span>
            )}
            {isPriceFilterActive && (
              <span 
                className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
              >
                Price: {priceFilterText}
              </span>
            )}
            {filters.exterior_colors?.map((color: string, index: number) => (
              <span 
                key={`exterior-${index}`}
                className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
              >
                Exterior: {color}
              </span>
            ))}
            {filters.interior_colors?.map((color: string, index: number) => (
              <span 
                key={`interior-${index}`}
                className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
              >
                Interior: {color}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;