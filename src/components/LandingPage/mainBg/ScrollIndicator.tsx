// components/hero/ScrollIndicator.tsx
import React from 'react';

interface ScrollIndicatorProps {
  isDarkMode: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ isDarkMode }) => {
  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="hidden sm:block absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 xl:bottom-12 left-1/2 transform -translate-x-1/2 z-50">
      <button
        onClick={handleScrollDown}
        className="group relative w-5 h-7 sm:w-6 sm:h-8 md:w-7 md:h-10 lg:w-8 lg:h-12 border-2 rounded-full mx-auto backdrop-blur-sm overflow-hidden
        border-gray-800 hover:scale-110 transition-all duration-300"
        aria-label="Scroll down"
      >
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/20 to-transparent 
        -translate-y-full group-hover:translate-y-full transition-transform duration-700`}></div>
        <div className={`w-1 h-2 sm:w-1 sm:h-2.5 md:w-1.5 md:h-3 lg:w-1.5 lg:h-4 rounded-full mx-auto mt-1.5 sm:mt-2 md:mt-2.5 lg:mt-3 ${
          isDarkMode ? 'bg-white/80' : 'bg-gray-800/80'
        }`} />
      </button>
    </div>
  );
};

export default ScrollIndicator;