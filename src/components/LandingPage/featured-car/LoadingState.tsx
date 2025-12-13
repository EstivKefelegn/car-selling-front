// components/featured-cars/LoadingState.tsx
import React from 'react';
import SectionHeader from './SectionHeader';

interface LoadingStateProps {
  isDarkMode: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isDarkMode }) => {
  return (
    <div className="py-6">
      <SectionHeader isDarkMode={isDarkMode} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`rounded-xl overflow-hidden animate-pulse ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            }`}
          >
            <div className="h-48 w-full bg-gray-300 dark:bg-gray-700" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;