// components/shop-by-manufacturer/ScrollControls.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollControlsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  isDarkMode: boolean;
}

const ScrollControls: React.FC<ScrollControlsProps> = ({
  onScrollLeft,
  onScrollRight,
  isDarkMode
}) => {
  return (
    <>
      <button
        onClick={onScrollLeft}
        className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
          isDarkMode 
            ? 'bg-gray-800/80 text-white hover:bg-gray-700 backdrop-blur-sm' 
            : 'bg-white/90 text-gray-800 hover:bg-white border border-gray-300 backdrop-blur-sm'
        } shadow-xl hover:scale-110`}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={onScrollRight}
        className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
          isDarkMode 
            ? 'bg-gray-800/80 text-white hover:bg-gray-700 backdrop-blur-sm' 
            : 'bg-white/90 text-gray-800 hover:bg-white border border-gray-300 backdrop-blur-sm'
        } shadow-xl hover:scale-110`}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </>
  );
};

export default ScrollControls;