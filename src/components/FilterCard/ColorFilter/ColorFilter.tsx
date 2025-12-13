// components/FilterCard/ColorFilter.tsx
import React from 'react';
import type { Color } from '../utils/color';

interface ColorFilterProps {
  colors: Color[];
  loading: boolean;
  selectedColorType: 'exterior' | 'interior' | 'all';
  exteriorColors: Color[];
  interiorColors: Color[];
  availableExteriorColors: Color[];
  availableInteriorColors: Color[];
  localFilters: any;
  isDarkMode: boolean;
  onColorTypeChange: (type: 'exterior' | 'interior' | 'all') => void;
  onColorToggle: (colorName: string, colorType: 'exterior' | 'interior') => void;
  onClearColorFilters: () => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  loading,
  selectedColorType,
  availableExteriorColors,
  availableInteriorColors,
  localFilters,
  isDarkMode,
  onColorTypeChange,
  onColorToggle,
  onClearColorFilters
}) => {
  const isColorSelected = (colorType: 'exterior' | 'interior', colorName: string) => {
    const key = colorType === 'exterior' ? 'exterior_colors' : 'interior_colors';
    return (localFilters[key] || []).includes(colorName);
  };

  const selectedColorsCount = React.useMemo(() => {
    const exteriorCount = localFilters.exterior_colors?.length || 0;
    const interiorCount = localFilters.interior_colors?.length || 0;
    return exteriorCount + interiorCount;
  }, [localFilters.exterior_colors, localFilters.interior_colors]);

  const selectedExteriorColorsText = React.useMemo(() => {
    const colors = localFilters.exterior_colors || [];
    return colors.length > 0 ? colors.join(', ') : '';
  }, [localFilters.exterior_colors]);

  const selectedInteriorColorsText = React.useMemo(() => {
    const colors = localFilters.interior_colors || [];
    return colors.length > 0 ? colors.join(', ') : '';
  }, [localFilters.interior_colors]);

  const renderColorButtons = (colorList: Color[], type: 'exterior' | 'interior') => (
    <div className="flex flex-wrap gap-2">
      {colorList.map((color) => {
        const isSelected = isColorSelected(type, color.name);
        return (
          <button
            key={color.id}
            onClick={() => onColorToggle(color.name, type)}
            className={`relative p-1 rounded-lg border-2 transition-all duration-200 ${
              isSelected
                ? 'border-gray-800 dark:border-gray-300 scale-105 shadow-lg'
                : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'
            }`}
            title={color.name}
          >
            <div
              className="w-8 h-8 rounded-md shadow-sm"
              style={{ backgroundColor: color.hex_code }}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Colors
        </label>
        <div className="flex space-x-1">
          <button
            onClick={() => onColorTypeChange('exterior')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              selectedColorType === 'exterior'
                ? isDarkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-white'
                : isDarkMode
                ? 'text-gray-500 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Exterior
          </button>
          <button
            onClick={() => onColorTypeChange('interior')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              selectedColorType === 'interior'
                ? isDarkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-white'
                : isDarkMode
                ? 'text-gray-500 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Interior
          </button>
          <button
            onClick={() => onColorTypeChange('all')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              selectedColorType === 'all'
                ? isDarkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-white'
                : isDarkMode
                ? 'text-gray-500 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All
          </button>
        </div>
      </div>
      
      {loading && selectedColorType !== 'all' ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <>
          {selectedColorType === 'all' && (
            <>
              {availableExteriorColors.length > 0 && (
                <div className="mb-3">
                  <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Exterior Colors
                  </p>
                  {renderColorButtons(availableExteriorColors, 'exterior')}
                </div>
              )}
              
              {availableInteriorColors.length > 0 && (
                <div>
                  <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Interior Colors
                  </p>
                  {renderColorButtons(availableInteriorColors, 'interior')}
                </div>
              )}
            </>
          )}
          
          {selectedColorType === 'exterior' && availableExteriorColors.length > 0 && (
            renderColorButtons(availableExteriorColors, 'exterior')
          )}
          
          {selectedColorType === 'interior' && availableInteriorColors.length > 0 && (
            renderColorButtons(availableInteriorColors, 'interior')
          )}
          
          {((selectedColorType === 'exterior' && availableExteriorColors.length === 0) ||
            (selectedColorType === 'interior' && availableInteriorColors.length === 0) ||
            (selectedColorType === 'all' && availableExteriorColors.length === 0 && availableInteriorColors.length === 0)) && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              No colors available
            </div>
          )}
        </>
      )}
      
      {selectedColorsCount > 0 && (
        <div className="mt-3 bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Selected: {selectedColorsCount} color{selectedColorsCount !== 1 ? 's' : ''}
              </span>
              <div className="text-xs mt-1">
                {selectedExteriorColorsText && (
                  <span className={`mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Exterior: {selectedExteriorColorsText}
                  </span>
                )}
                {selectedInteriorColorsText && (
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Interior: {selectedInteriorColorsText}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClearColorFilters}
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

export default ColorFilter;