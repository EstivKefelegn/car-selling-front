export interface CarFilter {
  manufacturer?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  colors?: number[];
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