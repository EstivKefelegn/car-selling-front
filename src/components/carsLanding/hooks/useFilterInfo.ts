import React from 'react';
import { formatPrice } from '../utils/helpers';

export const useFilterInfo = (filters: any) => {
  const activeFilterCount = React.useMemo(() => {
    return Object.keys(filters).filter(key => {
      const filterKey = key as keyof typeof filters;
      const value = filters[filterKey];
      
      if (filterKey === 'exterior_colors' || filterKey === 'interior_colors') {
        return Array.isArray(value) && value.length > 0;
      }
      
      if (filterKey === 'minPrice' || filterKey === 'maxPrice') {
        return value !== undefined && value !== null;
      }
      
      if (Array.isArray(value)) return value.length > 0;
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'number') return value !== 0;
      if (typeof value === 'boolean') return value;
      
      return true;
    }).length;
  }, [filters]);

  const priceFilterText = React.useMemo(() => {
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const minText = filters.minPrice !== undefined ? formatPrice(Number(filters.minPrice)) : 'Any';
      const maxText = filters.maxPrice !== undefined ? formatPrice(Number(filters.maxPrice)) : 'Any';
      return `${minText} - ${maxText}`;
    }
    return '';
  }, [filters.minPrice, filters.maxPrice]);

  const isPriceFilterActive = React.useMemo(() => 
    filters.minPrice !== undefined || filters.maxPrice !== undefined, 
    [filters.minPrice, filters.maxPrice]
  );

  const exteriorColorsCount = filters.exterior_colors?.length || 0;
  const interiorColorsCount = filters.interior_colors?.length || 0;
  const hasColorFilters = exteriorColorsCount > 0 || interiorColorsCount > 0;
  const exteriorColorsText = filters.exterior_colors?.join(', ') || '';
  const interiorColorsText = filters.interior_colors?.join(', ') || '';

  return {
    activeFilterCount,
    priceFilterText,
    isPriceFilterActive,
    exteriorColorsCount,
    interiorColorsCount,
    hasColorFilters,
    exteriorColorsText,
    interiorColorsText
  };
};