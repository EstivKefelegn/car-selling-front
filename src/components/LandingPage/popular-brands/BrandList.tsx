// components/popular-brands/BrandsList.tsx
import React from 'react';
import { type BrandsListProps } from './types';

const BrandsList: React.FC<BrandsListProps> = ({ brands, isDarkMode }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap justify-center gap-4">
        {brands.map((brand, index) => (
          <React.Fragment key={brand.id}>
            <a
              href={`/all-cars?manufacturer=${encodeURIComponent(brand.name)}`}
              className={`text-sm font-medium transition-colors hover:underline ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {brand.name}
              {brand.is_ev_only && (
                <span className="ml-1 text-xs">⚡</span>
              )}
            </a>
            {index < brands.length - 1 && (
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-700' : 'text-gray-300'
              }`}>
                •
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;