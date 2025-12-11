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
    });

    return {
      manufacturers: Array.from(manufacturers).sort(),
      models: Array.from(models).sort(),
      variants: Array.from(variants).sort(),
      years: Array.from(years).sort((a, b) => b - a),
      categories: Array.from(categories).sort(),
      categoryDisplays: Array.from(categoryDisplays).sort(),
      statuses: Array.from(statuses).sort(),
      featuredOptions: Array.from(featured),

      minPrice,
      maxPrice,

      minRange,
      maxRange,

      minPower,
      maxPower,
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
