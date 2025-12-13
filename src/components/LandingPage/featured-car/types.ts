// components/featured-cars/types.ts
export interface CarColor {
  id: number;
  name: string;
  hex_code: string;
  type: 'exterior' | 'interior';
}

export interface FeaturedCar {
  id: number;
  slug: string;
  manufacturer_name: string;
  manufacturer_logo: string;
  model_name: string;
  variant: string;
  model_year: number;
  category: string;
  category_display: string;
  status: string;
  status_display: string;
  featured: boolean;
  range_wltp: number;
  acceleration_0_100: string;
  motor_power: number;
  base_price: string;
  main_image_url: string;
  efficiency: number;
  total_configurations: number;
  created_at: string;
  available_exterior_colors: CarColor[];
  available_interior_colors: CarColor[];
}