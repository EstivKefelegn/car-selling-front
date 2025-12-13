export interface CarColor {
  id: number;
  name: string;
  hex_code: string;
  type?: 'exterior' | 'interior';
}

export interface Car {
  id: number;
  manufacturer_name: string;
  manufacturer_logo: string;
  model_name: string;
  variant: string;
  model_year: number;
  category: string;
  category_display: string;
  base_price: string;
  base_price_value: number | null;
  range_wltp: number;
  motor_power: number;
  acceleration_0_100: number;
  efficiency: number;
  total_configurations: number;
  status_display: string;
  featured: boolean;
  main_image_url: string;
  available_exterior_colors: CarColor[];
  available_interior_colors: CarColor[];
}

export interface CarFilter {
  manufacturer?: string;
  model?: string;
  minYear?: number | string;
  maxYear?: number | string;
  minPrice?: number | string;
  maxPrice?: number | string;
  category?: string;
  featured?: boolean;
  exterior_colors?: string[];
  interior_colors?: string[];
  colors?: number[];
}