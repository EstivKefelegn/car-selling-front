// components/shop-by-manufacturer/SectionTitle.tsx
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  isDarkMode: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, isDarkMode }) => {
  return (
    <div className="text-center mb-8">
      <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h2>
      <p className={`text-base md:text-lg max-w-2xl mx-auto ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;