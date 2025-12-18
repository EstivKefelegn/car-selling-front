// pages/about/components/ErrorState.tsx
import React from 'react';
import { RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  error: string;
  isDarkMode: boolean;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, isDarkMode, onRetry }) => {
  const isNotFound = error.includes('404') || error.includes('not found');

  if (isNotFound) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center max-w-md mx-4">
          <div className={`relative p-4 rounded-2xl mb-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Home size={48} className={`mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
          </div>
          <h2 className={`text-2xl font-bold mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            About Us Page Not Found
          </h2>
          <p className={`mb-8 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            The About Us page hasn't been set up yet or the data is not available.
          </p>
          <div className="space-y-4">
            <button
              onClick={onRetry}
              className={`w-full px-4 py-3 rounded-lg flex items-center justify-center font-medium transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              <RefreshCw size={20} className="mr-2" />
              Try Again
            </button>
            <Link
              to="/"
              className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <Home size={20} className="mr-2" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="text-center max-w-md mx-4">
        <div className={`relative p-4 rounded-2xl mb-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <RefreshCw size={48} className={`mx-auto ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`} />
        </div>
        <h2 className={`text-2xl font-bold mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Oops! Something went wrong
        </h2>
        <p className={`mb-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {error}
        </p>
        <button
          onClick={onRetry}
          className={`group relative overflow-hidden px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
            isDarkMode 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          <span className="relative z-10 flex items-center justify-center">
            <RefreshCw size={20} className="mr-3 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </span>
        </button>
      </div>
    </div>
  );
};

export default ErrorState;