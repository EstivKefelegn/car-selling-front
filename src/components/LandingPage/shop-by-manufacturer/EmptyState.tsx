// components/shop-by-manufacturer/EmptyState.tsx
import React from 'react';

interface EmptyStateProps {
  isDarkMode: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isDarkMode }) => {
  return (
    <div className="text-center py-12">
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
        No manufacturers found
      </p>
    </div>
  );
};

export default EmptyState;