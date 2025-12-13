// components/Footer/Copyright.tsx
import React from 'react';

interface CopyrightProps {
  isDarkMode: boolean;
}

const Copyright: React.FC<CopyrightProps> = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className={`py-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4 text-center text-sm">
        © {currentYear} Etiopikar. All rights reserved.
      </div>
    </div>
  );
};

export default Copyright;