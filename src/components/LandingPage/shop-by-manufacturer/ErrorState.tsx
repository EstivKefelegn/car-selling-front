// components/shop-by-manufacturer/ErrorState.tsx
import React from 'react';

interface ErrorStateProps {
  isDarkMode: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({ isDarkMode }) => {
  return (
    <div className="py-8">
      <div className={`rounded-xl p-6 text-center ${
        isDarkMode ? 'bg-gray-800/40' : 'bg-white/60'
      } backdrop-blur-sm`}>
        <p className={isDarkMode ? 'text-red-300' : 'text-red-600'}>
          Failed to load manufacturers
        </p>
      </div>
    </div>
  );
};

export default ErrorState;