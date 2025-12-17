// components/finance/FinanceHero.tsx
import React from 'react';

interface FinanceHeroProps {
  title: string;
  description: string;
  image: string;
  isDarkMode: boolean;
}

const FinanceHero: React.FC<FinanceHeroProps> = ({ 
  title, 
  description, 
  image, 
  isDarkMode 
}) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        {image ? (
          <img 
            src={image} 
            alt="Finance Hero" 
            className="w-full h-full object-cover opacity-20"
          />
        ) : (
          <div className={`w-full h-full ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-50'
          }`} />
        )}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            {description}
          </p>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className={`px-6 py-3 rounded-full ${
                isDarkMode
                    ? ' text-white border border-gray'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white '
          }`}>
            From 2.9% APR
          </div>
          <div className={`px-6 py-3 rounded-full ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            No Hidden Fees
          </div>
          <div className={`px-6 py-3 rounded-full ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            Fast Approval
          </div>
          <div className={`px-6 py-3 rounded-full ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            Flexible Terms
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceHero;