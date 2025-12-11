// useFeaturedCars.ts
import useEVCars from "./useEVCars";

const useFeaturedCars = () => {
  const { data: cars, loading, error } = useEVCars({
    featured: true
  });

  return {
    featuredCars: cars,
    loading,
    error
  };
};

export default useFeaturedCars;