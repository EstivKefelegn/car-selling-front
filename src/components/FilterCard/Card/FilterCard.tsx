// components/FilterCard/index.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDarkModeStore } from '../../../store/useDarkModeStore';
import useCarFilterStore from '../../../store/useCarFilterStore';
import type { CarFilter } from '../../../services/filters';
import useManufacturer from '../../../hooks/manufacturer/useManufacturers';
import useColors from '../../../hooks/colors/useColors';
import useCarsForFilter from '../../../hooks/cars/useCarsForFilter';
import { formatPrice,  parsePriceInput } from '../utils/price';
import FilterHeader from '../FilterHeader/FilterHeader';
import SelectFilter from '../SelectFilter/SelectFilter';
import PriceFilter from '../PriceFilter/PriceFilter';
import ColorFilter from '../ColorFilter/ColorFilter';
import YearFilter from '../YearFilter/YearFilter';
import ApplyButton from '../utils/ApplyButton';

interface FilterCardProps {
  onFilterChange?: (filters: CarFilter) => void;
  initialFilters?: CarFilter;
  showTitle?: boolean;
  compact?: boolean;
  standalone?: boolean;
}

const FilterCard: React.FC<FilterCardProps> = ({ 
  onFilterChange, 
  // initialFilters = {},
  showTitle = true,
  compact = false,
  // standalone = false
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
  const [selectedColorType, setSelectedColorType] = useState<'exterior' | 'interior' | 'all'>('exterior');
  
  // Price range state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([0, 0]);
  const [isPriceCustom, setIsPriceCustom] = useState(false);
  
  // Fetch data
  const { data: manufacturers, loading: manufacturersLoading } = useManufacturer({ name: '' });
  const { data: colors, loading: colorsLoading } = useColors({
    color_type: selectedColorType === 'all' ? '' : selectedColorType
  });
  const { filterOptions, loading: carsLoading, carsCount } = useCarsForFilter();

  // Generate predefined price ranges
  const priceRanges = useMemo(() => {
    if (!filterOptions.maxPrice || filterOptions.maxPrice === 0) return [];
    
    const ranges = [];
    const min = filterOptions.minPrice || 0;
    const max = filterOptions.maxPrice;
    const rangeStep = Math.ceil((max - min) / 5);
    
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
    
    ranges.push({ 
      label: 'Custom Range', 
      min: undefined, 
      max: undefined,
      isCustom: true 
    });
    
    return ranges;
  }, [filterOptions.minPrice, filterOptions.maxPrice]);

  // Filter colors by type
  const exteriorColors = useMemo(() => 
    colors?.filter(color => color.color_type === 'exterior') || [], 
    [colors]
  );
  
  const interiorColors = useMemo(() => 
    colors?.filter(color => color.color_type === 'interior') || [], 
    [colors]
  );

  const availableExteriorColors = useMemo(() => 
    exteriorColors.length > 0 ? exteriorColors : filterOptions.exteriorColors || [],
    [exteriorColors, filterOptions.exteriorColors]
  );
  
  const availableInteriorColors = useMemo(() => 
    interiorColors.length > 0 ? interiorColors : filterOptions.interiorColors || [],
    [interiorColors, filterOptions.interiorColors]
  );

  // Handle filter changes
  const handleFilterChange = useCallback((key: keyof CarFilter, value: any) => {
    updateFilter(key, value);
    setLocalFilters(prev => ({ ...prev, [key]: value }));
    onFilterChange?.({ ...storeFilters, [key]: value });
  }, [updateFilter, onFilterChange, storeFilters]);

  // Initialize price range when data loads
  useEffect(() => {
    if (filterOptions.maxPrice > 0 && priceRange[1] === 0) {
      const initialMin = filterOptions.minPrice || 0;
      const initialMax = filterOptions.maxPrice;
      setPriceRange([initialMin, initialMax]);
      setTempPriceRange([initialMin, initialMax]);
      
      if (!localFilters.minPrice && !localFilters.maxPrice) {
        handleFilterChange('minPrice', initialMin);
        handleFilterChange('maxPrice', initialMax);
      }
    }
  }, [filterOptions.minPrice, filterOptions.maxPrice, priceRange, localFilters, handleFilterChange]);

  // Update price range when store filters change
  useEffect(() => {
    if (storeFilters.minPrice !== undefined && storeFilters.maxPrice !== undefined) {
      const newMin = storeFilters.minPrice;
      const newMax = storeFilters.maxPrice;
      setPriceRange([newMin, newMax]);
      setTempPriceRange([newMin, newMax]);
      
      const matchingRange = priceRanges.find(range => 
        !range.isCustom && 
        storeFilters.minPrice === range.min && 
        storeFilters.maxPrice === range.max
      );
      setIsPriceCustom(!matchingRange);
    } else {
      setPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
      setTempPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
      setIsPriceCustom(false);
    }
  }, [storeFilters.minPrice, storeFilters.maxPrice, priceRanges, filterOptions.minPrice, filterOptions.maxPrice]);

  // Handle price range change
  const handlePriceRangeChange = useCallback((values: [number, number], updateFilters = true) => {
    const [min, max] = values;
    const boundedMin = Math.max(min, filterOptions.minPrice || 0);
    const boundedMax = Math.min(max, filterOptions.maxPrice || 0);
    
    if (boundedMin >= boundedMax) return;
    
    setTempPriceRange([boundedMin, boundedMax]);
    
    if (updateFilters) {
      handleFilterChange('minPrice', boundedMin);
      handleFilterChange('maxPrice', boundedMax);
      setPriceRange([boundedMin, boundedMax]);
      setIsPriceCustom(true);
    }
  }, [filterOptions.minPrice, filterOptions.maxPrice, handleFilterChange]);

  // Handle predefined price range selection
  const handlePredefinedRangeSelect = useCallback((range: { min?: number, max?: number, isCustom: boolean }) => {
    if (range.isCustom) {
      setIsPriceCustom(true);
      return;
    }
    
    setIsPriceCustom(false);
    if (range.min !== undefined && range.max !== undefined) {
      handlePriceRangeChange([range.min, range.max]);
    }
  }, [handlePriceRangeChange]);

  // Clear price filters
  const handleClearPriceFilters = useCallback(() => {
    handleFilterChange('minPrice', undefined);
    handleFilterChange('maxPrice', undefined);
    setPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
    setTempPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
    setIsPriceCustom(false);
  }, [handleFilterChange, filterOptions.minPrice, filterOptions.maxPrice]);

  // Handle min price input
  const handleMinPriceBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const value = parsePriceInput(e.target.value);
    if (value >= tempPriceRange[1]) {
      const newMax = Math.min(value + 100000, filterOptions.maxPrice || 0);
      handlePriceRangeChange([value, newMax]);
    } else {
      const newMin = Math.max(value, filterOptions.minPrice || 0);
      handlePriceRangeChange([newMin, tempPriceRange[1]]);
    }
  }, [tempPriceRange, filterOptions.maxPrice, filterOptions.minPrice, handlePriceRangeChange]);

  // Handle max price input
  const handleMaxPriceBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const value = parsePriceInput(e.target.value);
    if (value <= tempPriceRange[0]) {
      const newMin = Math.max(value - 100000, filterOptions.minPrice || 0);
      handlePriceRangeChange([newMin, value]);
    } else {
      const newMax = Math.min(value, filterOptions.maxPrice || 0);
      handlePriceRangeChange([tempPriceRange[0], newMax]);
    }
  }, [tempPriceRange, filterOptions.minPrice, filterOptions.maxPrice, handlePriceRangeChange]);

  // Handle immediate input changes
  const handleMinPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempPriceRange(prev => [parsePriceInput(value), prev[1]]);
  }, []);

  const handleMaxPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempPriceRange(prev => [prev[0], parsePriceInput(value)]);
  }, []);

  // Handle color toggle
  const handleColorToggle = useCallback((colorName: string, colorType: 'exterior' | 'interior') => {
    toggleColorFilter(colorType, colorName);
    
    const key = colorType === 'exterior' ? 'exterior_colors' : 'interior_colors';
    const currentColors = localFilters[key] || [];
    const newColors = currentColors.includes(colorName)
      ? currentColors.filter(c => c !== colorName)
      : [...currentColors, colorName];
    
    setLocalFilters(prev => ({ ...prev, [key]: newColors }));
    onFilterChange?.({ ...storeFilters, [key]: newColors });
  }, [toggleColorFilter, localFilters, onFilterChange, storeFilters]);

  // Clear all filters
  const handleClearAllFilters = useCallback(() => {
    clearFilters();
    resetColorFilters();
    setLocalFilters({});
    onFilterChange?.({});
    setSelectedColorType('exterior');
    setPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
    setTempPriceRange([filterOptions.minPrice || 0, filterOptions.maxPrice || 0]);
    setIsPriceCustom(false);
  }, [clearFilters, resetColorFilters, onFilterChange, filterOptions.minPrice, filterOptions.maxPrice]);

  // Clear selected colors
  const handleClearColorFilters = useCallback(() => {
    handleFilterChange('exterior_colors', []);
    handleFilterChange('interior_colors', []);
  }, [handleFilterChange]);

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
      
      if (filterKey === 'exterior_colors' || filterKey === 'interior_colors') {
        return Array.isArray(value) && value.length > 0;
      }
      
      if (Array.isArray(value)) return value.length > 0;
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'number') return value !== 0;
      if (typeof value === 'boolean') return value;
      
      return true;
    }).length;
    
    return count;
  }, [localFilters]);

  // Sync local state with store
  useEffect(() => {
    setLocalFilters(storeFilters);
  }, [storeFilters]);

  // Prepare manufacturer options
  const manufacturerOptions = useMemo(() => 
    manufacturers?.map(mfg => ({
      value: mfg.name,
      label: `${mfg.name} ${mfg.is_ev_only ? '(EV Only)' : ''}`
    })) || [],
    [manufacturers]
  );

  // Prepare model options
  const modelOptions = useMemo(() => 
    filterOptions.models.map(model => ({
      value: model,
      label: model
    })),
    [filterOptions.models]
  );

  // Prepare category options
  const categoryOptions = useMemo(() => 
    filterOptions.categories.map(category => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1)
    })),
    [filterOptions.categories]
  );

  return (
    <div className={`rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800/90' : 'bg-white'} p-${compact ? '4' : '6'}`}>
      <FilterHeader
        showTitle={showTitle}
        activeFilterCount={activeFilterCount}
        carsLoading={carsLoading}
        carsCount={carsCount}
        isDarkMode={isDarkMode}
        onClearAll={handleClearAllFilters}
      />

      {/* Manufacturer Filter */}
      <SelectFilter
        label="Manufacturer"
        value={localFilters.manufacturer || ''}
        onChange={(value) => handleFilterChange('manufacturer', value)}
        options={manufacturerOptions}
        placeholder="Select Manufacturer"
        loading={manufacturersLoading}
        isDarkMode={isDarkMode}
        showClear={!!localFilters.manufacturer}
        onClear={() => handleFilterChange('manufacturer', undefined)}
      />

      {/* Model Filter */}
      <SelectFilter
        label="Model"
        value={localFilters.model || ''}
        onChange={(value) => handleFilterChange('model', value)}
        options={modelOptions}
        placeholder="Select Model"
        secondaryLabel={`${filterOptions.models.length} models`}
        loading={carsLoading}
        isDarkMode={isDarkMode}
        showClear={!!localFilters.model}
        onClear={() => handleFilterChange('model', undefined)}
      />

      {/* Year Filter */}
      <YearFilter
        years={filterOptions.years}
        minYear={localFilters.minYear}
        maxYear={localFilters.maxYear}
        isDarkMode={isDarkMode}
        onMinYearChange={(year) => handleFilterChange('minYear', year)}
        onMaxYearChange={(year) => handleFilterChange('maxYear', year)}
      />

      {/* Price Filter */}
      <PriceFilter
        priceRanges={priceRanges}
        tempPriceRange={tempPriceRange}
        priceRange={priceRange}
        isPriceCustom={isPriceCustom}
        isPriceFilterActive={isPriceFilterActive}
        minPrice={filterOptions.minPrice || 0}
        maxPrice={filterOptions.maxPrice || 0}
        localMinPrice={localFilters.minPrice}
        localMaxPrice={localFilters.maxPrice}
        isDarkMode={isDarkMode}
        onRangeSelect={handlePredefinedRangeSelect}
        onPriceRangeChange={handlePriceRangeChange}
        onClearPriceFilters={handleClearPriceFilters}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        onMinPriceBlur={handleMinPriceBlur}
        onMaxPriceBlur={handleMaxPriceBlur}
      />

      {/* Color Filter */}
      <ColorFilter
        colors={colors || []}
        loading={colorsLoading}
        selectedColorType={selectedColorType}
        exteriorColors={exteriorColors}
        interiorColors={interiorColors}
        availableExteriorColors={availableExteriorColors}
        availableInteriorColors={availableInteriorColors}
        localFilters={localFilters}
        isDarkMode={isDarkMode}
        onColorTypeChange={setSelectedColorType}
        onColorToggle={handleColorToggle}
        onClearColorFilters={handleClearColorFilters}
      />

      {/* Category Filter */}
      <SelectFilter
        label="Category"
        value={localFilters.category || ''}
        onChange={(value) => handleFilterChange('category', value)}
        options={categoryOptions}
        placeholder="All Categories"
        secondaryLabel={`${filterOptions.categories.length} types`}
        isDarkMode={isDarkMode}
      />

      {/* Apply Filters Button */}
      <ApplyButton
        compact={compact}
        activeFilterCount={activeFilterCount}
        onApply={() => onFilterChange?.(localFilters)}
      />
    </div>
  );
};

export default FilterCard;