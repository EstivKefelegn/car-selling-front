// components/manufacturers/LoadingState.tsx
import React from 'react';

interface LoadingStateProps {
  isDarkMode: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isDarkMode }) => {
  return (
    <div className="text-center">
      <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
        isDarkMode ? 'border-gray-400' : 'border-gray-600'
      }`}></div>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
        Loading manufacturers...
      </p>
    </div>
  );
};

export default LoadingState;