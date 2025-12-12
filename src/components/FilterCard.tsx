import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDarkModeStore } from '../store/useDarkModeStore';
import useCarFilterStore from '../store/useCarFilterStore';
import type { CarFilter } from '../services/filters';
import useManufacturer from '../hooks/useManufacturers';
import useColors from '../hooks/useColors';
import useCarsForFilter from '../hooks/useCarsForFilter';

interface FilterCardProps {
  onFilterChange?: (filters: CarFilter) => void;
  initialFilters?: CarFilter;
  showTitle?: boolean;
  compact?: boolean;
  standalone?: boolean;
}

// Define formatPrice function outside the component to avoid hoisting issues
const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `${(price / 1000000).toFixed(0)}M`;
  } else if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 100000) {
    return `${(price / 1000).toFixed(0)}K`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(1)}K`;
  }
  return price.toLocaleString();
};

const FilterCard: React.FC<FilterCardProps> = ({ 
  onFilterChange, 
  initialFilters = {},
  showTitle = true,
  compact = false,
  standalone = false
}) => {
  const { isDarkMode } = useDarkModeStore();
  const { 
    filters: storeFilters, 
    updateFilter, 
    clearFilters,
    toggleColorFilter,
    resetColorFilters 
  } = useCarFilterStore();
  
  const [localFilters, setLocalFilters] = useState<CarFilter>(storeFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [selectedColorType, setSelectedColorType] = useState<'exterior' | 'interior' | 'all'>('exterior');
  
  // Price range state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([0, 0]);
  const [isPriceCustom, setIsPriceCustom] = useState(false);
  
  // Refs for slider
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<'min' | 'max' | null>(null);
  
  // Fetch data
  const { data: manufacturers, loading: manufacturersLoading } = useManufacturer({
    name: searchTerm,
  });

  // Fetch colors based on selected type - Fix endpoint if needed
  const { data: colors, loading: colorsLoading } = useColors({
    color_type: selectedColorType === 'all' ? '' : selectedColorType
  });

  const { filterOptions, loading: carsLoading, carsCount } = useCarsForFilter();

  // Format price with commas for input (now inside component)
  const formatPriceForInput = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Generate predefined price ranges based on actual data
  const priceRanges = useMemo(() => {
    if (!filterOptions.maxPrice || filterOptions.maxPrice === 0) return [];
    
    const ranges = [];
    const min = filterOptions.minPrice || 0;
    const max = filterOptions.maxPrice;
    const rangeStep = Math.ceil((max - min) / 5);
    
    // Create 5 equal ranges
    for (let i = 0; i < 5; i++) {
      const rangeMin = min + (rangeStep * i);
      const rangeMax = i === 4 ? max : min + (rangeStep * (i + 1));
      
      let label = '';
      if (i === 0) {
        label = `Under ${formatPrice(rangeMax)}`;
      } else if (i === 4) {
        label = `${formatPrice(rangeMin)}+`;
      } else {
        label = `${formatPrice(rangeMin)} - ${formatPrice(rangeMax)}`;
      }
      
      ranges.push({ 
        label, 
        min: rangeMin, 
        max: rangeMax,
        isCustom: false 
      });
    }
    
    // Add custom option
    ranges.push({ 
      label: 'Custom Range', 
      min: undefined, 
      max: undefined,
      isCustom: true 
    });
    
    return ranges;
  }, [filterOptions.minPrice, filterOptions.maxPrice]);

  // Filter colors by type for UI grouping
  const exteriorColors = useMemo(() => 
    colors?.filter(color => color.color_type === 'exterior') || [], 
    [colors]
  );
  
  const interiorColors = useMemo(() => 
    colors?.filter(color => color.color_type === 'interior') || [], 
    [colors]
  );

  // Use colors from filterOptions as fallback
  const availableExteriorColors = useMemo(() => 
    exteriorColors.length > 0 ? exteriorColors : filterOptions.exteriorColors || [],
    [exteriorColors, filterOptions.exteriorColors]
  );
  
  const availableInteriorColors = useMemo(() => 
    interiorColors.length > 0 ? interiorColors : filterOptions.interiorColors || [],
    [interiorColors, filterOptions.interiorColors]
  );

  // Parse price input
  const parsePriceInput = (value: string): number => {
    // Remove commas and any non-digit characters
    const cleanValue = value.replace(/[^\d]/g, '');
    return parseInt(cleanValue) || 0;
  };

  // Handle filter changes - update both store and local state
  const handleFilterChange = (key: keyof CarFilter, value: any) => {
    updateFilter(key, value);
    setLocalFilters(prev => ({ ...prev, [key]: value }));
    onFilterChange?.({ ...storeFilters, [key]: value });
  };

  // Initialize price range when data loads
  useEffect(() => {
    if (filterOptions.maxPrice > 0 && priceRange[1] === 0) {
      const initialMin = filterOptions.minPrice || 0;
      const initialMax = filterOptions.maxPrice;
      setPriceRange([initialMin, initialMax]);
      setTempPriceRange([initialMin, initialMax]);
      
      // Set initial filter values if not already set
      if (!localFilters.minPrice && !localFilters.maxPrice) {
        handleFilterChange('minPrice', initialMin);
        handleFilterChange('maxPrice', initialMax);
      }
    }
  }, [filterOptions.minPrice, filterOptions.maxPrice]);

  // Update price range when store filters change
  useEffect(() => {
    if (storeFilters.minPrice !== undefined && storeFilters.maxPrice !== undefined) {
      const newMin = storeFilters.minPrice;
      const newMax = storeFilters.maxPrice;
      setPriceRange([newMin, newMax]);
      setTempPriceRange([newMin, newMax]);
      
      // Check if current filters match any predefined range
      const matchingRange = priceRanges.find(range => 
        !range.isCustom && 
        storeFilters.minPrice === range.min && 
        storeFilters.maxPrice === range.max
      );
      setIsPriceCustom(!matchingRange);
    } else {
      // Reset to full range if filters are cleared
      setPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
      setTempPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
      setIsPriceCustom(false);
    }
  }, [storeFilters.minPrice, storeFilters.maxPrice, priceRanges, filterOptions.minPrice, filterOptions.maxPrice]);

  // Handle price range change
  const handlePriceRangeChange = (values: [number, number], updateFilters = true) => {
    const [min, max] = values;
    const boundedMin = Math.max(min, filterOptions.minPrice || 0);
    const boundedMax = Math.min(max, filterOptions.maxPrice || 0);
    
    if (boundedMin >= boundedMax) {
      // Don't allow min to be greater than or equal to max
      return;
    }
    
    setTempPriceRange([boundedMin, boundedMax]);
    
    if (updateFilters) {
      handleFilterChange('minPrice', boundedMin);
      handleFilterChange('maxPrice', boundedMax);
      setPriceRange([boundedMin, boundedMax]);
      setIsPriceCustom(true); // Mark as custom when user adjusts
    }
  };

  // Handle predefined price range selection
  const handlePredefinedRangeSelect = (range: { min?: number, max?: number, isCustom: boolean }) => {
    if (range.isCustom) {
      setIsPriceCustom(true);
      return;
    }
    
    setIsPriceCustom(false);
    if (range.min !== undefined && range.max !== undefined) {
      handlePriceRangeChange([range.min, range.max]);
    }
  };

  // Clear price filters
  const handleClearPriceFilters = () => {
    handleFilterChange('minPrice', undefined);
    handleFilterChange('maxPrice', undefined);
    setPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
    setTempPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
    setIsPriceCustom(false);
  };

  // Handle min price input change (on blur to reduce re-renders)
  const handleMinPriceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parsePriceInput(e.target.value);
    if (value >= tempPriceRange[1]) {
      // If min is greater than or equal to current max, adjust max
      const newMax = Math.min(value + 100000, filterOptions.maxPrice || 0);
      handlePriceRangeChange([value, newMax]);
    } else {
      const newMin = Math.max(value, filterOptions.minPrice || 0);
      handlePriceRangeChange([newMin, tempPriceRange[1]]);
    }
  };

  // Handle max price input change (on blur to reduce re-renders)
  const handleMaxPriceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parsePriceInput(e.target.value);
    if (value <= tempPriceRange[0]) {
      // If max is less than or equal to current min, adjust min
      const newMin = Math.max(value - 100000, filterOptions.minPrice || 0);
      handlePriceRangeChange([newMin, value]);
    } else {
      const newMax = Math.min(value, filterOptions.maxPrice || 0);
      handlePriceRangeChange([tempPriceRange[0], newMax]);
    }
  };

  // Handle immediate input changes for better UX
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow typing without immediate parsing
    setTempPriceRange(prev => [parsePriceInput(value), prev[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow typing without immediate parsing
    setTempPriceRange(prev => [prev[0], parsePriceInput(value)]);
  };

  // Calculate percentage for slider positioning
  const minPercent = useMemo(() => {
    const minPrice = filterOptions.minPrice || 0;
    const maxPrice = filterOptions.maxPrice || 1;
    const currentMin = tempPriceRange[0];
    return ((currentMin - minPrice) / (maxPrice - minPrice)) * 100;
  }, [tempPriceRange[0], filterOptions.minPrice, filterOptions.maxPrice]);

  const maxPercent = useMemo(() => {
    const minPrice = filterOptions.minPrice || 0;
    const maxPrice = filterOptions.maxPrice || 1;
    const currentMax = tempPriceRange[1];
    return ((currentMax - minPrice) / (maxPrice - minPrice)) * 100;
  }, [tempPriceRange[1], filterOptions.minPrice, filterOptions.maxPrice]);

  // Mouse event handlers for slider
  const handleMouseDown = (thumb: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = thumb;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!rangeRef.current || !isDragging.current) return;
      
      const rect = rangeRef.current.getBoundingClientRect();
      const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const value = (filterOptions.minPrice || 0) + percent * ((filterOptions.maxPrice || 0) - (filterOptions.minPrice || 0));
      
      if (isDragging.current === 'min') {
        const newMin = Math.min(Math.round(value), tempPriceRange[1] - 100000);
        setTempPriceRange([newMin, tempPriceRange[1]]);
      } else {
        const newMax = Math.max(Math.round(value), tempPriceRange[0] + 100000);
        setTempPriceRange([tempPriceRange[0], newMax]);
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      handlePriceRangeChange([tempPriceRange[0], tempPriceRange[1]], true);
      isDragging.current = null;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle color toggle with proper type
  const handleColorToggle = (colorName: string, colorType: 'exterior' | 'interior') => {
    toggleColorFilter(colorType, colorName);
    
    // Update local state
    const key = colorType === 'exterior' ? 'exterior_colors' : 'interior_colors';
    const currentColors = localFilters[key] || [];
    const newColors = currentColors.includes(colorName)
      ? currentColors.filter(c => c !== colorName)
      : [...currentColors, colorName];
    
    setLocalFilters(prev => ({ ...prev, [key]: newColors }));
    onFilterChange?.({ ...storeFilters, [key]: newColors });
  };

  // Check if color is selected
  const isColorSelected = (colorType: 'exterior' | 'interior', colorName: string) => {
    const key = colorType === 'exterior' ? 'exterior_colors' : 'interior_colors';
    return (localFilters[key] || []).includes(colorName);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    clearFilters();
    resetColorFilters();
    setLocalFilters({});
    onFilterChange?.({});
    setSearchTerm('');
    setModelSearch('');
    setSelectedColorType('exterior');
    // Reset price range to full range
    setPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
    setTempPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
    setIsPriceCustom(false);
  };

  // Get selected colors count
  const selectedColorsCount = useMemo(() => {
    const exteriorCount = localFilters.exterior_colors?.length || 0;
    const interiorCount = localFilters.interior_colors?.length || 0;
    return exteriorCount + interiorCount;
  }, [localFilters.exterior_colors, localFilters.interior_colors]);

  // Check if price filter is active
  const isPriceFilterActive = useMemo(() => {
    return localFilters.minPrice !== undefined && localFilters.maxPrice !== undefined &&
           (localFilters.minPrice !== (filterOptions.minPrice || 0) || localFilters.maxPrice !== (filterOptions.maxPrice || 0));
  }, [localFilters.minPrice, localFilters.maxPrice, filterOptions.minPrice, filterOptions.maxPrice]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    const count = Object.keys(localFilters).filter(key => {
      const filterKey = key as keyof CarFilter;
      const value = localFilters[filterKey];
      
      // Handle color arrays separately
      if (filterKey === 'exterior_colors' || filterKey === 'interior_colors') {
        return Array.isArray(value) && value.length > 0;
      }
      
      // Handle other filters
      if (Array.isArray(value)) return value.length > 0;
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'number') return value !== 0;
      if (typeof value === 'boolean') return value;
      
      return true;
    }).length;
    
    return count;
  }, [localFilters]);

  // Sync local state with store when store changes
  useEffect(() => {
    setLocalFilters(storeFilters);
  }, [storeFilters]);

  // Clear selected colors button
  const handleClearColorFilters = () => {
    handleFilterChange('exterior_colors', []);
    handleFilterChange('interior_colors', []);
  };

  // Get selected exterior colors text
  const selectedExteriorColorsText = useMemo(() => {
    const colors = localFilters.exterior_colors || [];
    return colors.length > 0 ? colors.join(', ') : '';
  }, [localFilters.exterior_colors]);

  // Get selected interior colors text
  const selectedInteriorColorsText = useMemo(() => {
    const colors = localFilters.interior_colors || [];
    return colors.length > 0 ? colors.join(', ') : '';
  }, [localFilters.interior_colors]);

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

      {/* Price Filter - COMPLETE WITH RANGE SELECTOR AND CLEAR BUTTON */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Full: {formatPrice(filterOptions.minPrice || 0)} - {formatPrice(filterOptions.maxPrice || 0)}
            </span>
            {isPriceFilterActive && (
              <button
                onClick={handleClearPriceFilters}
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
                localFilters.minPrice === range.min && 
                localFilters.maxPrice === range.max;
              const isCustomSelected = range.isCustom && isPriceCustom;
              
              return (
                <button
                  key={index}
                  onClick={() => handlePredefinedRangeSelect(range)}
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

        {/* Custom Price Range Section (shown when custom is selected) */}
        {isPriceCustom && (
          <>
            {/* Price Range Display */}
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
                
                {/* Price inputs */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Min Price
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formatPriceForInput(tempPriceRange[0])}
                        onChange={handleMinPriceChange}
                        onBlur={handleMinPriceBlur}
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
                        placeholder={formatPriceForInput(filterOptions.minPrice || 0)}
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
                        onChange={handleMaxPriceChange}
                        onBlur={handleMaxPriceBlur}
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
                        placeholder={formatPriceForInput(filterOptions.maxPrice || 0)}
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
              {/* Track background */}
              <div 
                ref={rangeRef}
                className={`absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              />
              
              {/* Selected range */}
              <div 
                className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900"
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                }}
              />
              
              {/* Min thumb */}
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
              
              {/* Max thumb */}
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
            
            {/* Price marks */}
            <div className="flex justify-between mt-2">
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                {formatPrice(filterOptions.minPrice || 0)}
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                {formatPrice(filterOptions.maxPrice || 0)}
              </span>
            </div>
          </>
        )}
        
        {/* Show selected range when not custom */}
        {!isPriceCustom && isPriceFilterActive && (
          <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Selected: {formatPrice(localFilters.minPrice!)} - {formatPrice(localFilters.maxPrice!)}
                </span>
              </div>
              <button
                onClick={handleClearPriceFilters}
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

      {/* Color Filter with Type Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Colors
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
        
        {colorsLoading && selectedColorType !== 'all' ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <>
            {/* Show color type labels when showing all colors */}
            {selectedColorType === 'all' && (
              <>
                {availableExteriorColors.length > 0 && (
                  <div className="mb-3">
                    <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Exterior Colors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availableExteriorColors.map((color) => {
                        const isSelected = isColorSelected('exterior', color.name);
                        return (
                          <button
                            key={`exterior-${color.id}`}
                            onClick={() => handleColorToggle(color.name, 'exterior')}
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
                
                {availableInteriorColors.length > 0 && (
                  <div>
                    <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Interior Colors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availableInteriorColors.map((color) => {
                        const isSelected = isColorSelected('interior', color.name);
                        return (
                          <button
                            key={`interior-${color.id}`}
                            onClick={() => handleColorToggle(color.name, 'interior')}
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
              </>
            )}
            
            {/* Show specific type colors */}
            {selectedColorType === 'exterior' && availableExteriorColors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {availableExteriorColors.map((color) => {
                  const isSelected = isColorSelected('exterior', color.name);
                  return (
                    <button
                      key={color.id}
                      onClick={() => handleColorToggle(color.name, 'exterior')}
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
            )}
            
            {selectedColorType === 'interior' && availableInteriorColors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {availableInteriorColors.map((color) => {
                  const isSelected = isColorSelected('interior', color.name);
                  return (
                    <button
                      key={color.id}
                      onClick={() => handleColorToggle(color.name, 'interior')}
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
            )}
            
            {/* No colors message */}
            {((selectedColorType === 'exterior' && availableExteriorColors.length === 0) ||
              (selectedColorType === 'interior' && availableInteriorColors.length === 0) ||
              (selectedColorType === 'all' && availableExteriorColors.length === 0 && availableInteriorColors.length === 0)) && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No colors available
              </div>
            )}
          </>
        )}
        
        {/* Selected Colors Summary */}
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
                onClick={handleClearColorFilters}
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