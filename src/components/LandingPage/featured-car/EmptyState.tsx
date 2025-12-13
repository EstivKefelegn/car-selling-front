// components/featured-cars/EmptyState.tsx
import React from 'react';
import SectionHeader from './SectionHeader';

interface EmptyStateProps {
  isDarkMode: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isDarkMode }) => {
  return (
    <div className="py-6">
      <SectionHeader isDarkMode={isDarkMode} />
      
      <div className={`rounded-xl p-6 text-center ${
        isDarkMode 
          ? 'bg-gray-800/50 text-gray-400' 
          : 'bg-gray-100 text-gray-600'
      }`}>
        <p>No featured cars available</p>
      </div>
    </div>
  );
};

export default EmptyState;