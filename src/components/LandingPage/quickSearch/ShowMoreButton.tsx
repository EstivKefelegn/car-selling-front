// components/manufacturers/ShowMoreButton.tsx
import React from 'react';
import type { ShowMoreButtonProps } from './types';

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  showAll,
  isDarkMode,
  count,
  onClick
}) => {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        className={`group relative px-8 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
          isDarkMode 
            ? 'bg-gray-800/60 text-white hover:bg-gray-800/80' 
            : 'bg-white/80 text-gray-800 hover:bg-white border border-gray-300'
        }`}
      >
        <div className="relative z-10 font-medium">
          {showAll ? 'Show Less' : `Show All ${count} Manufacturers`}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
        -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>
    </div>
  );
};

export default ShowMoreButton;