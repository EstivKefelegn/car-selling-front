// pages/about/components/LoadingState.tsx
import React from 'react';
import LoadingSpinner from '../../../utils/LoadingSpinner';

interface LoadingStateProps {
  isDarkMode: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isDarkMode }) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <LoadingSpinner size="lg" />
      <p className={`mt-6 text-lg font-medium ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      } animate-pulse`}>
        Loading our story...
      </p>
    </div>
  );
};

export default LoadingState;