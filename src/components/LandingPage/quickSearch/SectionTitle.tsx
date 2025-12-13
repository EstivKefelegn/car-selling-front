// components/manufacturers/SectionTitle.tsx
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  isDarkMode: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, isDarkMode }) => {
  return (
    <div className="text-center mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h2>
      <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;