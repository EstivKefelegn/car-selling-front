// components/featured-cars/ErrorState.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  error: string;
  isDarkMode: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, isDarkMode }) => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured Cars
        </h2>
        <Link
          to="/all-cars"
          className={`text-sm font-medium transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          View All →
        </Link>
      </div>
      
      <div className={`rounded-xl p-6 text-center ${
        isDarkMode 
          ? 'bg-red-900/20 border border-red-800 text-red-300' 
          : 'bg-red-50 border border-red-200 text-red-600'
      }`}>
        <p>Failed to load featured cars</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    </div>
  );
};

export default ErrorState;