// useFeaturedCars.ts
import useEVCars from "./useEVCars";

const useAvailableCars = () => {
  const { data: cars, loading, error } = useEVCars({
    status: "available"
  });

  return {
    status: cars,
    loading,
    error
  };
};

export default useAvailableCars;