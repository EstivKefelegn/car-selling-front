// components/FilterCard/PriceFilter.tsx
import React, { useRef, useMemo } from 'react';
import { formatPrice, formatPriceForInput } from '../utils/price';

interface PriceRange {
  label: string;
  min?: number;
  max?: number;
  isCustom: boolean;
}

interface PriceFilterProps {
  priceRanges: PriceRange[];
  tempPriceRange: [number, number];
  priceRange: [number, number];
  isPriceCustom: boolean;
  isPriceFilterActive: boolean;
  minPrice: number;
  maxPrice: number;
  localMinPrice?: number;
  localMaxPrice?: number;
  isDarkMode: boolean;
  onRangeSelect: (range: PriceRange) => void;
  onPriceRangeChange: (values: [number, number], updateFilters?: boolean) => void;
  onClearPriceFilters: () => void;
  onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMinPriceBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onMaxPriceBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRanges,
  tempPriceRange,
//   priceRange,
  isPriceCustom,
  isPriceFilterActive,
  minPrice,
  maxPrice,
  localMinPrice,
  localMaxPrice,
  isDarkMode,
  onRangeSelect,
  onPriceRangeChange,
  onClearPriceFilters,
  onMinPriceChange,
  onMaxPriceChange,
  onMinPriceBlur,
  onMaxPriceBlur
}) => {
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<'min' | 'max' | null>(null);

  const minPercent = useMemo(() => {
    return ((tempPriceRange[0] - minPrice) / (maxPrice - minPrice)) * 100;
  }, [tempPriceRange[0], minPrice, maxPrice]);

  const maxPercent = useMemo(() => {
    return ((tempPriceRange[1] - minPrice) / (maxPrice - minPrice)) * 100;
  }, [tempPriceRange[1], minPrice, maxPrice]);

  const handleMouseDown = (thumb: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = thumb;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!rangeRef.current || !isDragging.current) return;
      
      const rect = rangeRef.current.getBoundingClientRect();
      const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const value = minPrice + percent * (maxPrice - minPrice);
      
      if (isDragging.current === 'min') {
        const newMin = Math.min(Math.round(value), tempPriceRange[1] - 100000);
        onPriceRangeChange([newMin, tempPriceRange[1]], false);
      } else {
        const newMax = Math.max(Math.round(value), tempPriceRange[0] + 100000);
        onPriceRangeChange([tempPriceRange[0], newMax], false);
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      onPriceRangeChange([tempPriceRange[0], tempPriceRange[1]], true);
      isDragging.current = null;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Full: {formatPrice(minPrice)} - {formatPrice(maxPrice)}
          </span>
          {isPriceFilterActive && (
            <button
              onClick={onClearPriceFilters}
              className={`text-xs px-2 py-1 rounded ${
                isDarkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              }`}
              title="Clear price filter"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Predefined Price Range Buttons */}
      {priceRanges.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {priceRanges.map((range, index) => {
            const isSelected = !range.isCustom && 
              localMinPrice === range.min && 
              localMaxPrice === range.max;
            const isCustomSelected = range.isCustom && isPriceCustom;
            
            return (
              <button
                key={index}
                onClick={() => onRangeSelect(range)}
                className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  isSelected || isCustomSelected
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg'
                      : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Custom Price Range Section */}
      {isPriceCustom && (
        <>
          <div className="mb-4">
            <div className={`text-center p-3 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-700/50 border-gray-600' 
                : 'bg-gray-50 border-gray-300'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Custom Range:
                </div>
                <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatPrice(tempPriceRange[0])} - {formatPrice(tempPriceRange[1])}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Min Price
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatPriceForInput(tempPriceRange[0])}
                      onChange={onMinPriceChange}
                      onBlur={onMinPriceBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          (e.target as HTMLInputElement).blur();
                        }
                      }}
                      className={`w-full px-3 py-2 text-sm rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-gray-800`}
                      placeholder={formatPriceForInput(minPrice)}
                    />
                    <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      ₽
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Max Price
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatPriceForInput(tempPriceRange[1])}
                      onChange={onMaxPriceChange}
                      onBlur={onMaxPriceBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          (e.target as HTMLInputElement).blur();
                        }
                      }}
                      className={`w-full px-3 py-2 text-sm rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-gray-800`}
                      placeholder={formatPriceForInput(maxPrice)}
                    />
                    <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      ₽
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dual Range Slider */}
          <div className="relative h-8 py-3">
            <div 
              ref={rangeRef}
              className={`absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            />
            
            <div 
              className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            />
            
            <div
              ref={minThumbRef}
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-800 shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
              style={{ left: `${minPercent}%` }}
              onMouseDown={handleMouseDown('min')}
            >
              <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-800 text-white'
              }`}>
                {formatPrice(tempPriceRange[0])}
              </div>
            </div>
            
            <div
              ref={maxThumbRef}
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-800 shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
              style={{ left: `${maxPercent}%` }}
              onMouseDown={handleMouseDown('max')}
            >
              <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-800 text-white'
              }`}>
                {formatPrice(tempPriceRange[1])}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2">
            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {formatPrice(minPrice)}
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {formatPrice(maxPrice)}
            </span>
          </div>
        </>
      )}
      
      {!isPriceCustom && isPriceFilterActive && (
        <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Selected: {formatPrice(localMinPrice!)} - {formatPrice(localMaxPrice!)}
              </span>
            </div>
            <button
              onClick={onClearPriceFilters}
              className={`text-xs px-2 py-1 rounded ${
                isDarkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              }`}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;