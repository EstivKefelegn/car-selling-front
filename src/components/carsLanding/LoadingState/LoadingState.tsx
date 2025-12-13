import React from 'react';

interface LoadingStateProps {
  isDarkMode: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isDarkMode }) => {
  return (
    <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'} mb-4`}></div>
      <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Loading cars...
      </p>
    </div>
  );
};

export default LoadingState;