// components/manufacturers/ManufacturerCard.tsx
import React from 'react';
import type { ManufacturerCardProps } from './types';

const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
  manufacturer,
  isDarkMode,
  onClick
}) => {
  return (
    <button
      onClick={() => onClick(manufacturer)}
      className={`group relative p-4 rounded-xl transition-all duration-300 overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/50 hover:bg-gray-800/70 text-white' 
          : 'bg-white/80 hover:bg-white text-gray-800 border border-gray-200'
      } hover:scale-105 hover:shadow-xl`}
      aria-label={`Search ${manufacturer.name} cars`}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isDarkMode 
          ? 'from-transparent via-gray-700/20 to-transparent' 
          : 'from-transparent via-gray-100/20 to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <div className="text-lg font-semibold mb-2">{manufacturer.name}</div>
        <div className={`text-sm flex items-center justify-between ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <span>{manufacturer.country}</span>
          {manufacturer.founded_year && (
            <span className={`px-2 py-1 rounded text-xs ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}>
              {manufacturer.founded_year}
            </span>
          )}
        </div>
        {manufacturer.is_ev_only && (
          <div className="mt-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              isDarkMode 
                ? 'bg-green-900/30 text-green-300' 
                : 'bg-green-100 text-green-700'
            }`}>
              EV Only
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default ManufacturerCard;