// hooks/useNewCars.ts
import { useMemo } from "react";
import useEVCars, { type CarQuery } from "./useEVCars";

const useNewCars = (limit: number = 4) => {
  // Create a car query that orders by creation date (newest first)
  const carQuery: CarQuery = useMemo(() => ({
    ordering: "-created_at", // Negative sign for descending order (newest first)
    timestamp: Date.now() // Optional: force re-fetch when needed
  }), []);

  const { data: cars, loading, error } = useEVCars(carQuery);

  // Apply limit to the results - MAKE SURE cars is Car[], not Car[][]
  const newCars = useMemo(() => {
    if (!cars) return [];
    
    // If cars is a 2D array, flatten it
    if (Array.isArray(cars[0]) && Array.isArray(cars[0][0])) {
      console.warn('cars is a 2D array, flattening it');
      const flattened = cars.flat();
      return flattened.slice(0, limit);
    }
    
    // If cars is already a flat array
    return cars.slice(0, limit);
  }, [cars, limit]);

  return {
    newCars,
    isLoading: loading,
    error: error,
    totalCount: cars?.length || 0
  };
};

export default useNewCars;