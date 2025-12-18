// pages/about/components/EmptyState.tsx
import React from 'react';
import { Car } from 'lucide-react';

interface EmptyStateProps {
  isDarkMode: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isDarkMode }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="text-center max-w-md mx-4">
        <div className={`relative p-4 rounded-2xl mb-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <Car size={48} className={`mx-auto ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`} />
        </div>
        <h2 className={`text-2xl font-bold mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Our Story is Coming Soon
        </h2>
        <p className={`mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          We're currently crafting our story. Check back soon to learn more about our journey!
        </p>
      </div>
    </div>
  );
};

export default EmptyState;