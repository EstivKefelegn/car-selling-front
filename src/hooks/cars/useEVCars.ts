import { useMemo } from "react";
import useData from "../data/useData";

export interface Car {
  color_ids: any;
  base_price_value: number;
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
  available_exterior_colors: Color[];
  available_interior_colors: Color[];
}

export interface Color {
  id: number;
  name: string;
  hex_code: string;
  type: 'exterior' | 'interior';
}
// In useEVCars.ts, update the CarQuery interface
export interface CarQuery {
  manufacturer_name?: string;
  model_name?: string;  
  category?: string;
  status?: string;
  model_year?: number;
  min_year?: number;    
  max_year?: number;    
  min_price?: number;   
  max_price?: number;   
  featured?: boolean;
  search?: string;
  colors?: number[];
  exterior_colors?: string[];
  interior_colors?: string[];
  ordering?: string; // Add this for API sorting
  timestamp?: number; // Optional: for forcing re-fetch
}
// Updated useEVCars function with ordering support
const useEVCars = (carQuery: CarQuery) => {
  // Build query params dynamically and remove empty values
  const params = useMemo(() => {
    const result: Record<string, any> = {};

    if (carQuery.manufacturer_name?.trim()) result.manufacturer_name = carQuery.manufacturer_name;
    if (carQuery.model_name?.trim()) result.model_name = carQuery.model_name;
    if (carQuery.category?.trim()) result.category = carQuery.category;
    if (carQuery.status) result.status = carQuery.status;
    if (carQuery.model_year) result.model_year = carQuery.model_year;
    if (carQuery.min_year) result.min_year = carQuery.min_year;
    if (carQuery.max_year) result.max_year = carQuery.max_year;
    if (carQuery.min_price) result.min_price = carQuery.min_price;
    if (carQuery.max_price) result.max_price = carQuery.max_price;
    if (carQuery.featured !== undefined) result.featured = carQuery.featured;
    if (carQuery.search?.trim()) result.search = carQuery.search;
    
    // Handle color filters
    if (carQuery.exterior_colors && carQuery.exterior_colors.length > 0) {
      result.exterior_color = carQuery.exterior_colors.join(',');
    }
    
    if (carQuery.interior_colors && carQuery.interior_colors.length > 0) {
      result.interior_color = carQuery.interior_colors.join(',');
    }
    
    // For backward compatibility
    if (carQuery.colors && carQuery.colors.length > 0 && !carQuery.exterior_colors && !carQuery.interior_colors) {
      result.colors = carQuery.colors.join(',');
    }

    // Add ordering if provided
    if (carQuery.ordering) {
      result.ordering = carQuery.ordering;
    }

    return result;
  }, [
    carQuery.manufacturer_name,
    carQuery.model_name,
    carQuery.category,
    carQuery.model_year,
    carQuery.min_year,
    carQuery.max_year,
    carQuery.min_price,
    carQuery.max_price,
    carQuery.featured,
    carQuery.search,
    carQuery.colors,
    carQuery.exterior_colors,
    carQuery.interior_colors,
    carQuery.ordering,
    carQuery.timestamp
  ]);

  // Use the useData hook
  return useData<Car>(
    "/cars/electric-cars/",
    { params },
    [params],
    {
      onError: (error: any) => {
        console.error("Failed to fetch electric cars. Possible reasons:");
        console.error("- Network issue or server unreachable");
        console.error("- Invalid or empty query parameters:", params);
        console.error("- Server returned an error:", error?.message || error);
      }
    }
  );
};

export default useEVCars