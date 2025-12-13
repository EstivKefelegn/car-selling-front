// components/featured-cars/hooks/useFeaturedCarsData.ts
import useFeaturedCars from './useFeaturedCars';

export const useFeaturedCarsData = () => {
  const { featuredCars, isLoading, error } = useFeaturedCars(4);
  
  return {
    featuredCars,
    isLoading,
    error,
    hasCars: featuredCars && featuredCars.length > 0
  };
};