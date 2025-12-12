// hooks/useCarsForFilter.ts
import { useMemo } from "react";
import useData from "./useData";
import type { Car } from "./useEVCars";

export interface FilterOptions {
  manufacturers: string[];
  models: string[];
  variants: string[];
  years: number[];
  categories: string[];
  categoryDisplays: string[];
  statuses: string[];
  featuredOptions: boolean[];
  
  // Color options
  exteriorColors: { id: number; name: string; hex_code: string }[];
  interiorColors: { id: number; name: string; hex_code: string }[];
  allColors: { id: number; name: string; hex_code: string; type: 'exterior' | 'interior' }[];

  minPrice: number;
  maxPrice: number;

  minRange: number;
  maxRange: number;

  minPower: number;
  maxPower: number;
}

const useCarsForFilter = () => {
  const { data: cars, loading, error } = useData<Car>("/electric-cars/");

  // Memoize computed filter options
  const filterOptions: FilterOptions = useMemo(() => {
    if (!cars || cars.length === 0) {
      return {
        manufacturers: [],
        models: [],
        variants: [],
        years: [],
        categories: [],
        categoryDisplays: [],
        statuses: [],
        featuredOptions: [],
        
        exteriorColors: [],
        interiorColors: [],
        allColors: [],

        minPrice: 0,
        maxPrice: 0,

        minRange: 0,
        maxRange: 0,

        minPower: 0,
        maxPower: 0,
      };
    }

    const manufacturers = new Set<string>();
    const models = new Set<string>();
    const variants = new Set<string>();
    const years = new Set<number>();
    const categories = new Set<string>();
    const categoryDisplays = new Set<string>();
    const statuses = new Set<string>();
    const featured = new Set<boolean>();
    
    // Color maps for deduplication
    const exteriorColorsMap = new Map<number, { id: number; name: string; hex_code: string }>();
    const interiorColorsMap = new Map<number, { id: number; name: string; hex_code: string }>();
    const allColorsMap = new Map<number, { id: number; name: string; hex_code: string; type: 'exterior' | 'interior' }>();

    let minPrice = Infinity;
    let maxPrice = 0;

    let minRange = Infinity;
    let maxRange = 0;

    let minPower = Infinity;
    let maxPower = 0;

    cars.forEach(car => {
      manufacturers.add(car.manufacturer_name);
      models.add(car.model_name);
      variants.add(car.variant);
      years.add(car.model_year);
      categories.add(car.category);
      categoryDisplays.add(car.category_display);
      statuses.add(car.status);
      featured.add(car.featured);

      const price = parseFloat(car.base_price);
      if (price < minPrice) minPrice = price;
      if (price > maxPrice) maxPrice = price;

      if (car.range_wltp < minRange) minRange = car.range_wltp;
      if (car.range_wltp > maxRange) maxRange = car.range_wltp;

      if (car.motor_power < minPower) minPower = car.motor_power;
      if (car.motor_power > maxPower) maxPower = car.motor_power;
      
      // Collect exterior colors
      if (car.available_exterior_colors) {
        car.available_exterior_colors.forEach(color => {
          if (!exteriorColorsMap.has(color.id)) {
            exteriorColorsMap.set(color.id, {
              id: color.id,
              name: color.name,
              hex_code: color.hex_code
            });
          }
          if (!allColorsMap.has(color.id)) {
            allColorsMap.set(color.id, {
              id: color.id,
              name: color.name,
              hex_code: color.hex_code,
              type: 'exterior' as const
            });
          }
        });
      }
      
      // Collect interior colors
      if (car.available_interior_colors) {
        car.available_interior_colors.forEach(color => {
          if (!interiorColorsMap.has(color.id)) {
            interiorColorsMap.set(color.id, {
              id: color.id,
              name: color.name,
              hex_code: color.hex_code
            });
          }
          if (!allColorsMap.has(color.id)) {
            allColorsMap.set(color.id, {
              id: color.id,
              name: color.name,
              hex_code: color.hex_code,
              type: 'interior' as const
            });
          }
        });
      }
    });

    // Helper function to sort colors
    const sortColors = <T extends { name: string }>(colors: T[]): T[] => 
      colors.sort((a, b) => a.name.localeCompare(b.name));

    const exteriorColors = Array.from(exteriorColorsMap.values());
    const interiorColors = Array.from(interiorColorsMap.values());
    const allColors = Array.from(allColorsMap.values());

    return {
      manufacturers: Array.from(manufacturers).sort(),
      models: Array.from(models).sort(),
      variants: Array.from(variants).sort(),
      years: Array.from(years).sort((a, b) => b - a),
      categories: Array.from(categories).sort(),
      categoryDisplays: Array.from(categoryDisplays).sort(),
      statuses: Array.from(statuses).sort(),
      featuredOptions: Array.from(featured),
      
      exteriorColors: sortColors(exteriorColors),
      interiorColors: sortColors(interiorColors),
      allColors: sortColors(allColors),

      minPrice: minPrice === Infinity ? 0 : minPrice,
      maxPrice: maxPrice === 0 ? 0 : maxPrice,

      minRange: minRange === Infinity ? 0 : minRange,
      maxRange: maxRange === 0 ? 0 : maxRange,

      minPower: minPower === Infinity ? 0 : minPower,
      maxPower: maxPower === 0 ? 0 : maxPower,
    };
  }, [cars]);

  return {
    filterOptions,
    loading,
    error,
    carsCount: cars?.length || 0,
  };
};

export default useCarsForFilter;