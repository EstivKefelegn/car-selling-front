import React, { useState, useEffect, useMemo } from 'react';
import { useDarkModeStore } from '../store/useDarkModeStore';
import type { CarFilter } from '../services/filters';
import useManufacturer from '../hooks/useManufacturers';
import useColors from '../hooks/useColors';
import useCarsForFilter from '../hooks/useCarsForFilter';

interface FilterCardProps {
  onFilterChange: (filters: CarFilter) => void;
  initialFilters?: CarFilter;
  showTitle?: boolean;
  compact?: boolean;
  standalone?: boolean; // Add this prop
}

const FilterCard: React.FC<FilterCardProps> = ({ 
  onFilterChange, 
  initialFilters = {},
  showTitle = true,
  compact = false,
  standalone = false // Default to false
}) => {
  const { isDarkMode } = useDarkModeStore();
  
  // State for filters
  const [filters, setFilters] = useState<CarFilter>(initialFilters);
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

  // Handle filter changes
  const handleFilterChange = (key: keyof CarFilter, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Handle multiple color selection with type
  const handleColorToggle = (colorId: number, colorType: string) => {
    const currentColors = filters.colors || [];
    const newColors = currentColors.includes(colorId)
      ? currentColors.filter(c => c !== colorId)
      : [...currentColors, colorId];
    
    // Store color type in separate filter if needed
    handleFilterChange('colors', newColors);
  };

  // Handle price range selection
  const handlePriceRangeSelect = (min?: number, max?: number) => {
    const newFilters = {
      ...filters,
      minPrice: min,
      maxPrice: max,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setPriceRange([min || 0, max || filterOptions.maxPrice]);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedFilters: CarFilter = {};
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setSearchTerm('');
    setModelSearch('');
    setPriceRange([0, filterOptions.maxPrice]);
    setSelectedColorType('exterior');
  };

  // Active filter count
  const activeFilterCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof CarFilter];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== '';
  }).length;

  // Initialize price range when data loads
  useEffect(() => {
    if (filterOptions.maxPrice > 0 && priceRange[1] === 0) {
      setPriceRange([0, filterOptions.maxPrice]);
    }
  }, [filterOptions.maxPrice, priceRange]);

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
              onClick={handleClearFilters}
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
          <input
            type="text"
            placeholder="Search manufacturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-gray-800`}
          />
          <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Selected Manufacturer */}
        {filters.manufacturer && (
          <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-300"></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {filters.manufacturer}
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
        
        {/* Manufacturer Suggestions */}
        {searchTerm && !filters.manufacturer && (
          <div className={`mt-3 max-h-40 overflow-y-auto rounded-lg border ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            {manufacturersLoading ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
              </div>
            ) : manufacturers && manufacturers.length > 0 ? (
              <div className="py-1">
                {manufacturers.map((manufacturer) => (
                  <button
                    key={manufacturer.id}
                    onClick={() => {
                      handleFilterChange('manufacturer', manufacturer.name);
                      setSearchTerm('');
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <span>{manufacturer.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      manufacturer.is_ev_only
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {manufacturer.is_ev_only ? 'EV Only' : 'Multiple'}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className={`text-sm text-center p-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                No manufacturers found
              </p>
            )}
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
          <input
            type="text"
            placeholder="Search model..."
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-gray-800`}
          />
        </div>
        
        {/* Selected Model */}
        {filters.model && (
          <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-300"></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {filters.model}
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
        
        {/* Model Suggestions */}
        {modelSearch && !filters.model && (
          <div className={`mt-3 max-h-40 overflow-y-auto rounded-lg border ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            {carsLoading ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
              </div>
            ) : (
              <div className="py-1">
                {filteredModels.map((model, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleFilterChange('model', model);
                      setModelSearch('');
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
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
            value={filters.minYear || ''}
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
            value={filters.maxYear || ''}
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
            const isSelected = filters.minPrice === range.min && filters.maxPrice === range.max;
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
                    const isSelected = filters.colors?.includes(color.id) || false;
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
                    const isSelected = filters.colors?.includes(color.id) || false;
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
                  const isSelected = filters.colors?.includes(color.id) || false;
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
        {filters.colors && filters.colors.length > 0 && (
          <div className="mt-3 bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Selected: {filters.colors.length} color{filters.colors.length !== 1 ? 's' : ''}
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
          value={filters.category || ''}
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
              filters.featured
                ? 'bg-gradient-to-r from-gray-800 to-gray-900'
                : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}>
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                filters.featured ? 'transform translate-x-5' : ''
              }`}></div>
            </div>
            <span className="font-medium">Show Featured Cars Only</span>
          </label>
          <input
            type="checkbox"
            checked={filters.featured || false}
            onChange={(e) => handleFilterChange('featured', e.target.checked || undefined)}
            className="hidden"
          />
        </div>
      )}

      {/* Apply Filters Button */}
      {!compact && (
        <button
          onClick={() => onFilterChange(filters)}
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