// components/about/sections/shared/InfoCard.tsx
import React from 'react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  isDarkMode: boolean;
  content?: string;
  children?: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  isDarkMode,
  content,
  children,
  className = ''
}) => {
  return (
    <div className={`rounded-xl ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    } shadow-lg ${className}`}>
      <div className="flex items-center mb-4">
        <div className="mr-3">
          {icon}
        </div>
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h2>
      </div>
      
      {content && (
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {content}
        </p>
      )}
      
      {children}
    </div>
  );
};

export default InfoCard;