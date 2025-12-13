// components/shop-by-manufacturer/GradientOverlays.tsx
import React from 'react';

interface GradientOverlaysProps {
  isDarkMode: boolean;
}

const GradientOverlays: React.FC<GradientOverlaysProps> = ({ isDarkMode }) => {
  return (
    <>
      <div className={`absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r ${
        isDarkMode 
          ? 'from-gray-900 to-transparent' 
          : 'from-white to-transparent'
      } pointer-events-none`} />
      <div className={`absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l ${
        isDarkMode 
          ? 'from-gray-900 to-transparent' 
          : 'from-white to-transparent'
      } pointer-events-none`} />
    </>
  );
};

export default GradientOverlays;