// hooks/useCarsForFilter.ts
import useData from "./useData";
import type { Car } from "./useEVCars";

export interface FilterOptions {
  models: string[];
  minPrice: number;
  maxPrice: number;
  years: number[];
  categories: string[];
}

const useCarsForFilter = () => {
  const { data: cars, loading, error } = useData<Car>("/electric-cars");
  
  // Extract unique filter options from cars data
  const filterOptions: FilterOptions = {
    models: [],
    minPrice: 0,
    maxPrice: 0,
    years: [],
    categories: [],
  };

  if (cars && cars.length > 0) {
    // Extract unique models
    const uniqueModels = new Set<string>();
    const uniqueYears = new Set<number>();
    const uniqueCategories = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;

    cars.forEach(car => {
      uniqueModels.add(car.model_name);
      uniqueYears.add(car.model_year);
      uniqueCategories.add(car.category);
      
      const price = parseFloat(car.base_price);
      if (price < minPrice) minPrice = price;
      if (price > maxPrice) maxPrice = price;
    });

    filterOptions.models = Array.from(uniqueModels).sort();
    filterOptions.years = Array.from(uniqueYears).sort((a, b) => b - a); // Latest first
    filterOptions.categories = Array.from(uniqueCategories).sort();
    filterOptions.minPrice = minPrice;
    filterOptions.maxPrice = maxPrice;
  }

  return {
    filterOptions,
    loading,
    error,
    carsCount: cars?.length || 0,
  };
};

export default useCarsForFilter;