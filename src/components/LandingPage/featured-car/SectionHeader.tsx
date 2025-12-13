// components/featured-cars/SectionHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  isDarkMode: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ isDarkMode }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Featured Cars
      </h2>
      <Link
        to="/all-cars"
        className={`text-sm font-medium transition-colors ${
          isDarkMode 
            ? 'text-gray-400 hover:text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        View All →
      </Link>
    </div>
  );
};

export default SectionHeader;