// types/filter.ts
export interface CarFilter {
  manufacturer?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  colors?: number[]; // Changed to array of color IDs
  category?: string;
  featured?: boolean;
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