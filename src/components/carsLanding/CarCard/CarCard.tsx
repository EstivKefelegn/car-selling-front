import React from "react";
import ImageSection from "./ImageSection";
import CarInfoSection from "./CarInfoSection";
import { formatPrice as defaultFormatPrice } from "../utils/helpers";
import type { Car } from "../../../hooks/cars/useEVCars";

interface CarCardProps {
  car: Car;
  isDarkMode: boolean;
  apiBaseUrl: string;
  formatPrice?: (price: number) => string;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  isDarkMode,
  apiBaseUrl,
  formatPrice: formatPriceProp = defaultFormatPrice,
}) => {
  const carPrice =
    car.base_price_value !== undefined && car.base_price_value !== null
      ? Number(car.base_price_value)
      : null;

  const formattedPrice =
    carPrice !== null ? formatPriceProp(carPrice) : "Price not available";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.02] ${
        isDarkMode
          ? "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50"
          : "bg-white border border-gray-200/80 hover:border-gray-300/50"
      }`}
    >
      {/* {car.featured && (
        <div className="absolute top-6 -right-10 rotate-45 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs font-bold px-12 py-1 z-10">
          FEATURED
        </div>
      )} */}

      <ImageSection
        car={car}
        apiBaseUrl={apiBaseUrl}
        isDarkMode={isDarkMode}
        formattedPrice={formattedPrice}
      />

      <CarInfoSection
        car={car}
        isDarkMode={isDarkMode}
        formattedPrice={formattedPrice}
        carPrice={carPrice}
      />

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default CarCard;
