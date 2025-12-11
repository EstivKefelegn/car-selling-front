// useEVCars.ts - CORRECTED VERSION
import useData from "./useData";

export interface Car {
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
}

export interface CarQuery {
    manufacturer_name?: string;
    category?: string;
    model_year?: number;
    featured?: boolean;
    search?: string;
}

const useEVCars = (carQuery: CarQuery) => {
  return useData<Car>(
    "/electric-cars",  // ✅ Match the working pattern (no trailing slash)
    {
      params: {
        manufacturer_name: carQuery.manufacturer_name,
        category: carQuery.category,
        model_year: carQuery.model_year,
        featured: carQuery.featured,  // ✅ Make sure this is included
        search: carQuery.search    
      }
    },
    [
      carQuery.manufacturer_name,
      carQuery.category,
      carQuery.model_year,
      carQuery.featured,  // ✅ Add to dependencies
      carQuery.search
    ]
  );
};

export default useEVCars;