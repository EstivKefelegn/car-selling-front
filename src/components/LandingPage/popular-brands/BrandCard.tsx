// components/popular-brands/BrandCard.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { type BrandCardProps } from './types';

const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  isSelected,
  isDarkMode,
  onClick
}) => {
  return (
    <button
      onClick={() => onClick(brand.name)}
      className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 ${
        isSelected
          ? isDarkMode
            ? 'bg-gray-800 text-white shadow-lg'
            : 'bg-white text-gray-900 shadow-lg border border-gray-200'
          : isDarkMode
            ? 'bg-gray-800/40 text-gray-400 hover:text-gray-300 hover:bg-gray-700/60 border border-gray-700/50'
            : 'bg-white/80 text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200'
      }`}
    >
      <span className="font-medium">{brand.name}</span>
      {brand.is_ev_only && (
        <span className="text-xs">⚡</span>
      )}
      <ChevronDown size={14} className={`transition-transform ${
        isSelected ? 'rotate-180' : ''
      }`} />
    </button>
  );
};

export default BrandCard;