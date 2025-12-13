// components/shop-by-manufacturer/LoadingState.tsx
import React from 'react';

interface LoadingStateProps {
  isDarkMode: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isDarkMode }) => {
  return (
    <div className="relative">
      <div className="flex space-x-6 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-shrink-0 w-48 h-56 rounded-xl animate-pulse ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
            }`}
          >
            <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-t-xl" />
            <div className="p-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;