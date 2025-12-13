import React from 'react';

interface ErrorStateProps {
  error: string;
  isDarkMode: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, isDarkMode }) => {
  return (
    <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg`}>
      <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
        Error loading featured cars
      </p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {error}
      </p>
    </div>
  );
};

export default ErrorState;