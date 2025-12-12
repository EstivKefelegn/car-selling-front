// hooks/useFeaturedCars.ts
import useEVCars from './useEVCars';

interface FeaturedCar {
  id: number;
  featured: boolean;
  // Add other properties as needed
}

const useFeaturedCars = (limit: number = 4) => {
  const { data: cars, loading, error } = useEVCars({
    featured: true 
  });

  // Apply limit to the results
  const featuredCars = cars ? cars.slice(0, limit) : [];

  return {
    featuredCars,
    isLoading: loading,
    error: error
  };
};

export default useFeaturedCars;