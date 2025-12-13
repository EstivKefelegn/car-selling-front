// components/manufacturers/ErrorState.tsx
import React from 'react';

interface ErrorStateProps {
  isDarkMode: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({ isDarkMode }) => {
  return (
    <div className={`rounded-2xl p-8 text-center ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
    } backdrop-blur-sm`}>
      <p className={isDarkMode ? 'text-red-300' : 'text-red-600'}>
        Failed to load manufacturers
      </p>
    </div>
  );
};

export default ErrorState;