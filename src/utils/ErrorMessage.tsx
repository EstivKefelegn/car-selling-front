// components/ui/ErrorMessage.tsx
import React from 'react';
import { useDarkModeStore } from '../store/useDarkModeStore';

interface ErrorMessageProps {
  message: string;
  error?: Error | string;
  retryText?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  error, 
  retryText = "Retry",
  onRetry 
}) => {
  const { isDarkMode } = useDarkModeStore();

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} mr-3`}>
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.196 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold text-lg mb-1 ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
            {message}
          </h3>
          {error && (
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              {typeof error === 'string' ? error : error.message}
            </p>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className={`mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? 'bg-red-700 hover:bg-red-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {retryText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;