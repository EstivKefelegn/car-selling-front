// useFeaturedCars.ts
import useEVCars from "./useEVCars";

const useFeaturedCars = () => {
  const { data: cars, loading, error } = useEVCars({
    status: "available"
  });

  return {
    status: cars,
    loading,
    error
  };
};

export default useFeaturedCars;