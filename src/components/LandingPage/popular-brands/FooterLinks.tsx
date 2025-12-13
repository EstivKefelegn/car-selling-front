// components/popular-brands/FooterLinks.tsx
import React from 'react';

interface FooterLinksProps {
  brandsCount: number;
  isDarkMode: boolean;
}

const FooterLinks: React.FC<FooterLinksProps> = ({ brandsCount, isDarkMode }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-700/30">
      <div className={`text-sm ${
        isDarkMode ? 'text-gray-500' : 'text-gray-500'
      }`}>
        {brandsCount} popular brands
      </div>
      
      <a
        href="/manufacturers"
        className={`text-sm font-medium transition-colors ${
          isDarkMode 
            ? 'text-gray-400 hover:text-gray-300' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        View all manufacturers →
      </a>
    </div>
  );
};

export default FooterLinks;