// components/popular-brands/SectionHeader.tsx
import React from 'react';
import { Car } from 'lucide-react';

interface SectionHeaderProps {
  isDarkMode: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ isDarkMode }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Car size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
        <h3 className={`text-lg font-semibold ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Popular Brands
        </h3>
      </div>
    </div>
  );
};

export default SectionHeader;