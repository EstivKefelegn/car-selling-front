import React, { useState, useEffect, useMemo } from 'react';
import { useDarkModeStore } from '../store/useDarkModeStore';
import useCarFilterStore from '../store/useCarFilterStore'; // Add this import
import type { CarFilter } from '../services/filters';
import useManufacturer from '../hooks/useManufacturers';
import useColors from '../hooks/useColors';
import useCarsForFilter from '../hooks/useCarsForFilter';

interface FilterCardProps {
  onFilterChange?: (filters: CarFilter) => void; // Make optional
  initialFilters?: CarFilter;
  showTitle?: boolean;
  compact?: boolean;
  standalone?: boolean;
}

const FilterCard: React.FC<FilterCardProps> = ({ 
  onFilterChange, 
  initialFilters = {},
  showTitle = true,
  compact = false,
  standalone = false
}) => {
  const { isDarkMode } = useDarkModeStore();
  const { filters: storeFilters, updateFilter, clearFilters } = useCarFilterStore();
  
  // Use store filters as primary, fallback to initialFilters
  const [localFilters, setLocalFilters] = useState<CarFilter>(storeFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [selectedColorType, setSelectedColorType] = useState<'exterior' | 'interior' | 'all'>('exterior');
  
  // Fetch data
  const { data: manufacturers, loading: manufacturersLoading } = useManufacturer({
    name: searchTerm,
  });

  // Fetch colors based on selected type
  const { data: colors, loading: colorsLoading } = useColors({
    color_type: selectedColorType === 'all' ? '' : selectedColorType
  });

  const { filterOptions, loading: carsLoading, carsCount } = useCarsForFilter();

  // Filter colors by type for UI grouping
  const exteriorColors = useMemo(() => 
    colors?.filter(color => color.color_type === 'exterior') || [], 
    [colors]
  );
  
  const interiorColors = useMemo(() => 
    colors?.filter(color => color.color_type === 'interior') || [], 
    [colors]
  );

  // Generate price ranges based on actual data
  const priceRanges = useMemo(() => {
    if (!filterOptions.maxPrice) return [];
    
    const ranges = [];
    const max = filterOptions.maxPrice;
    
    // Create dynamic ranges based on max price
    if (max <= 5000000) {
      ranges.push({ label: 'Under 1M', min: 0, max: 1000000 });
      ranges.push({ label: '1M - 2M', min: 1000000, max: 2000000 });
      ranges.push({ label: '2M - 3M', min: 2000000, max: 3000000 });
      ranges.push({ label: '3M - 5M', min: 3000000, max: 5000000 });
    } else if (max <= 10000000) {
      ranges.push({ label: 'Under 2M', min: 0, max: 2000000 });
      ranges.push({ label: '2M - 5M', min: 2000000, max: 5000000 });
      ranges.push({ label: '5M - 7M', min: 5000000, max: 7000000 });
      ranges.push({ label: '7M - 10M', min: 7000000, max: 10000000 });
    } else {
      ranges.push({ label: 'Under 5M', min: 0, max: 5000000 });
      ranges.push({ label: '5M - 10M', min: 5000000, max: 10000000 });
      ranges.push({ label: '10M - 15M', min: 10000000, max: 15000000 });
      ranges.push({ label: '15M - 20M', min: 15000000, max: 20000000 });
      if (max > 20000000) {
        ranges.push({ label: '20M+', min: 20000000, max: undefined });
      }
    }
    
    return ranges;
  }, [filterOptions.maxPrice]);

  // Filtered models based on search
  const filteredModels = filterOptions.models.filter(model =>
    model.toLowerCase().includes(modelSearch.toLowerCase())
  );

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 100000) {
      return `${(price / 1000000).toFixed(2)}M`;
    }
    return price.toLocaleString();
  };

  // Handle filter changes - update both store and local state
  const handleFilterChange = (key: keyof CarFilter, value: any) => {
    updateFilter(key, value); // Update store
    setLocalFilters(prev => ({ ...prev, [key]: value })); // Update local state
    onFilterChange?.({ ...storeFilters, [key]: value }); // Call callback if provided
  };

  // Handle multiple color selection with type
  const handleColorToggle = (colorId: number, colorType: string) => {
    const currentColors = localFilters.colors || [];
    const newColors = currentColors.includes(colorId)
      ? currentColors.filter(c => c !== colorId)
      : [...currentColors, colorId];
    
    handleFilterChange('colors', newColors);
  };

  // Handle price range selection
  const handlePriceRangeSelect = (min?: number, max?: number) => {
    const newFilters = {
      ...localFilters,
      minPrice: min,
      maxPrice: max,
    };
    setLocalFilters(newFilters);
    useCarFilterStore.getState().setFilters(newFilters); // Update store
    onFilterChange?.(newFilters);
    setPriceRange([min || 0, max || filterOptions.maxPrice]);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    clearFilters(); // Clear store
    setLocalFilters({}); // Clear local state
    onFilterChange?.({}); // Call callback if provided
    setSearchTerm('');
    setModelSearch('');
    setPriceRange([0, filterOptions.maxPrice]);
    setSelectedColorType('exterior');
  };

  // Active filter count
  const activeFilterCount = Object.keys(localFilters).filter(key => {
    const value = localFilters[key as keyof CarFilter];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== '';
  }).length;

  // Initialize price range when data loads
  useEffect(() => {
    if (filterOptions.maxPrice > 0 && priceRange[1] === 0) {
      setPriceRange([0, filterOptions.maxPrice]);
    }
  }, [filterOptions.maxPrice, priceRange]);

  // Sync local state with store when store changes
  useEffect(() => {
    setLocalFilters(storeFilters);
  }, [storeFilters]);

  return (
    <div className={`rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800/90' : 'bg-white'} p-${compact ? '4' : '6'}`}>
      {/* Header */}
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Filter Cars
            </h3>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {carsLoading ? 'Loading cars...' : `${carsCount} cars available`}
              {activeFilterCount > 0 && ` • ${activeFilterCount} active filter${activeFilterCount !== 1 ? 's' : ''}`}
            </p>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearAllFilters}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Manufacturer Filter */}
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Manufacturer
        </label>
        <div className="relative">
          <select
            value={localFilters.manufacturer || ''}
            onChange={(e) => handleFilterChange('manufacturer', e.target.value || undefined)}
            className={`w-full px-4 py-3 rounded-xl border appearance-none ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-gray-800`}
          >
            <option value="">Select Manufacturer</option>
            {manufacturersLoading ? (
              <option value="" disabled>Loading manufacturers...</option>
            ) : manufacturers && manufacturers.length > 0 ? (
              manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.name}>
                  {manufacturer.name} {manufacturer.is_ev_only ? '(EV Only)' : ''}
                </option>
              ))
            ) : (
              <option value="" disabled>No manufacturers available</option>
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        
        {/* Selected Manufacturer Display */}
        {localFilters.manufacturer && (
          <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-300"></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {localFilters.manufacturer}
              </span>
            </div>
            <button
              onClick={() => handleFilterChange('manufacturer', undefined)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Model Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Model
          </label>
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            {filterOptions.models.length} models
          </span>
        </div>
        <div className="relative">
          <select
            value={localFilters.model || ''}
            onChange={(e) => handleFilterChange('model', e.target.value || undefined)}
            className={`w-full px-4 py-3 rounded-xl border appearance-none ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-gray-800`}
          >
            <option value="">Select Model</option>
            {carsLoading ? (
              <option value="" disabled>Loading models...</option>
            ) : filterOptions.models.length > 0 ? (
              filterOptions.models.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))
            ) : (
              <option value="" disabled>No models available</option>
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        
        {/* Selected Model Display */}
        {localFilters.model && (
          <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-300"></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {localFilters.model}
              </span>
            </div>
            <button
              onClick={() => handleFilterChange('model', undefined)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Year Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Year Range
          </label>
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            {filterOptions.years[0]} - {filterOptions.years[filterOptions.years.length - 1]}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select
            value={localFilters.minYear || ''}
            onChange={(e) => handleFilterChange('minYear', e.target.value ? parseInt(e.target.value) : undefined)}
            className={`px-4 py-3 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-gray-800`}
          >
            <option value="">Min Year</option>
            {filterOptions.years.map((year) => (
              <option key={`min-${year}`} value={year}>
                {year}
              </option>
            ))}
          </select>
          
          <select
            value={localFilters.maxYear || ''}
            onChange={(e) => handleFilterChange('maxYear', e.target.value ? parseInt(e.target.value) : undefined)}
            className={`px-4 py-3 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-gray-800`}
          >
            <option value="">Max Year</option>
            {filterOptions.years.map((year) => (
              <option key={`max-${year}`} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Price Range
          </label>
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            {formatPrice(filterOptions.minPrice)} - {formatPrice(filterOptions.maxPrice)}
          </span>
        </div>
        
        {/* Price Range Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {priceRanges.map((range) => {
            const isSelected = localFilters.minPrice === range.min && localFilters.maxPrice === range.max;
            const label = range.max ? `${formatPrice(range.min)} - ${formatPrice(range.max)}` : `${formatPrice(range.min)}+`;
            
            return (
              <button
                key={range.label}
                onClick={() => handlePriceRangeSelect(range.min, range.max)}
                className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg'
                      : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter with Type Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Color
          </label>
          <div className="flex space-x-1">
            <button
              onClick={() => setSelectedColorType('exterior')}
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
              onClick={() => setSelectedColorType('interior')}
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
              onClick={() => setSelectedColorType('all')}
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
        
        {colorsLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <>
            {/* Show color type labels when showing all colors */}
            {selectedColorType === 'all' && exteriorColors.length > 0 && (
              <div className="mb-3">
                <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Exterior Colors
                </p>
                <div className="flex flex-wrap gap-2">
                  {exteriorColors.map((color) => {
                    const isSelected = localFilters.colors?.includes(color.id) || false;
                    return (
                      <button
                        key={color.id}
                        onClick={() => handleColorToggle(color.id, color.color_type)}
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
              </div>
            )}
            
            {selectedColorType === 'all' && interiorColors.length > 0 && (
              <div>
                <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Interior Colors
                </p>
                <div className="flex flex-wrap gap-2">
                  {interiorColors.map((color) => {
                    const isSelected = localFilters.colors?.includes(color.id) || false;
                    return (
                      <button
                        key={color.id}
                        onClick={() => handleColorToggle(color.id, color.color_type)}
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
              </div>
            )}
            
            {/* Show all colors without grouping when specific type selected */}
            {selectedColorType !== 'all' && (
              <div className="flex flex-wrap gap-2">
                {colors?.map((color) => {
                  const isSelected = localFilters.colors?.includes(color.id) || false;
                  return (
                    <button
                      key={color.id}
                      onClick={() => handleColorToggle(color.id, color.color_type)}
                      className={`relative p-1 rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-gray-800 dark:border-gray-300 scale-105 shadow-lg'
                          : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'
                      }`}
                      title={`${color.name} (${color.color_type_display})`}
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
            )}
          </>
        )}
        
        {/* Selected Colors Summary */}
        {localFilters.colors && localFilters.colors.length > 0 && (
          <div className="mt-3 bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Selected: {localFilters.colors.length} color{localFilters.colors.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => handleFilterChange('colors', [])}
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

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Category
          </label>
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            {filterOptions.categories.length} types
          </span>
        </div>
        <select
          value={localFilters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
          className={`w-full px-4 py-3 rounded-xl border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-gray-800`}
        >
          <option value="">All Categories</option>
          {filterOptions.categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Filter - Only show if standalone */}
      {standalone && (
        <div className="mb-6">
          <label className={`flex items-center space-x-3 cursor-pointer group ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <div className={`relative w-10 h-5 rounded-full transition-colors ${
              localFilters.featured
                ? 'bg-gradient-to-r from-gray-800 to-gray-900'
                : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}>
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                localFilters.featured ? 'transform translate-x-5' : ''
              }`}></div>
            </div>
            <span className="font-medium">Show Featured Cars Only</span>
          </label>
          <input
            type="checkbox"
            checked={localFilters.featured || false}
            onChange={(e) => handleFilterChange('featured', e.target.checked || undefined)}
            className="hidden"
          />
        </div>
      )}

      {/* Apply Filters Button */}
      {!compact && onFilterChange && (
        <button
          onClick={() => onFilterChange(localFilters)}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:scale-105
            bg-gradient-to-r from-gray-800 to-gray-900 text-white group relative`}
        >
          <div className="relative z-10">Apply Filters ({activeFilterCount})</div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
            -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      )}
    </div>
  );
};

export default FilterCard;