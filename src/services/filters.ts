// services/filters.ts
export interface CarFilter {
  country?: string;
  is_ev_only?: boolean;
  manufacturer?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  colors?: number[]; 
  exterior_colors?: string[]; 
  interior_colors?: string[]; 
  category?: string;
  featured?: boolean;
  search?: string;
}

export interface Manufacturer {
  id: number;
  name: string;
  country: string;
  founded_year: number;
  is_ev_only: boolean;
  description: string;
  website: string;
  headquarters: string;
}

// Helper type for filter keys
export type CarFilterKey = keyof CarFilter;

// Helper function to convert filter to CarQuery
export const filterToCarQuery = (filters: CarFilter) => {
  return {
    manufacturer_name: filters.manufacturer,
    model_name: filters.model,
    category: filters.category,
    min_year: filters.minYear,
    max_year: filters.maxYear,
    min_price: filters.minPrice,
    max_price: filters.maxPrice,
    featured: filters.featured,
    search: filters.search,
    // Pass color arrays - backend expects these as query params
    exterior_colors: filters.exterior_colors,
    interior_colors: filters.interior_colors,
    // For backward compatibility
    colors: filters.colors,
  };
};

// Helper function to get active filter count
export const getActiveFilterCount = (filters: CarFilter): number => {
  let count = 0;
  
  if (filters.manufacturer) count++;
  if (filters.model) count++;
  if (filters.minYear || filters.maxYear) count++;
  if (filters.minPrice || filters.maxPrice) count++;
  if (filters.category) count++;
  if (filters.featured) count++;
  if (filters.search) count++;
  
  // Count color filters
  if (filters.exterior_colors?.length) count++;
  if (filters.interior_colors?.length) count++;
  if (filters.colors?.length && !filters.exterior_colors?.length && !filters.interior_colors?.length) count++;
  
  return count;
};