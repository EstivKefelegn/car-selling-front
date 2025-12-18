// components/new-cars/CarCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { Car } from '../../hooks/cars/useEVCars';
import { buildImageUrl } from '../../utils/imageUrlBuilder';
import { formatPrice } from '../../utils/priceFormatter';
import { useDarkModeStore } from '../../store/useDarkModeStore';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { isDarkMode } = useDarkModeStore();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `https://via.placeholder.com/400x300/${isDarkMode ? '333' : 'eee'}/${isDarkMode ? '000' : '666'}?text=${car.manufacturer_name}+${car.model_name}`;
  };

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  // Calculate how many days ago the car was added
  const getDaysAgo = (createdAt: string) => {
    try {
      const createdDate = new Date(createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return `${Math.floor(diffDays / 30)} months ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <Link
      to={`/car/${car.id}`}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700' 
          : 'bg-gradient-to-b from-white to-gray-50 border border-gray-200'
      } shadow-lg`}
    >
      {/* New Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
        }`}>
          NEW
        </span>
      </div>

      {/* Added Time Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
          isDarkMode 
            ? 'bg-gray-800/80 text-gray-300' 
            : 'bg-white/80 text-gray-700'
        } backdrop-blur-sm`}>
          {getDaysAgo(car.created_at)}
        </span>
      </div>

      {/* Manufacturer Logo */}
      {car.manufacturer_logo && (
        <div className={`absolute top-16 right-4 w-10 h-10 rounded-full p-1.5 shadow-lg ${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-sm`}>
          <img
            src={buildImageUrl(car.manufacturer_logo)}
            alt={car.manufacturer_name}
            className="w-full h-full object-contain"
            onError={handleLogoError}
          />
        </div>
      )}

      {/* Car Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        {car.main_image_url ? (
          <img
            src={buildImageUrl(car.main_image_url)}
            alt={`${car.manufacturer_name} ${car.model_name}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <span className={`text-xl font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {car.manufacturer_name} {car.model_name}
            </span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Car Info */}
      <div className="p-5">
        {/* Manufacturer and Model */}
        <div className="mb-3">
          <h3 className={`font-bold text-xl mb-1 truncate ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {car.manufacturer_name} {car.model_name}
          </h3>
          <div className="flex items-center gap-2">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {car.variant}
            </p>
            <span className="text-gray-500">•</span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {car.model_year}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className={`font-bold text-2xl mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {formatPrice(car.base_price)}
        </div>

        {/* Car Specs Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className={`p-3 rounded-xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-blue-50'
          }`}>
            <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
              Range
            </div>
            <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {car.range_wltp}<span className="text-xs font-normal"> km</span>
            </div>
          </div>
          
          <div className={`p-3 rounded-xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-purple-50'
          }`}>
            <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-purple-600'}`}>
              0-100 km/h
            </div>
            <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {car.acceleration_0_100}<span className="text-xs font-normal">s</span>
            </div>
          </div>
          
          <div className={`p-3 rounded-xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-green-50'
          }`}>
            <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-green-600'}`}>
              Power
            </div>
            <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {car.motor_power}<span className="text-xs font-normal"> HP</span>
            </div>
          </div>
        </div>

        {/* Status and Category */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
              car.status === 'available' 
                ? isDarkMode 
                  ? 'bg-green-900/30 text-green-300' 
                  : 'bg-green-100 text-green-700'
                : isDarkMode 
                  ? 'bg-red-900/30 text-red-300' 
                  : 'bg-red-100 text-red-700'
            }`}>
              {car.status_display}
            </span>
          </div>
          
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {car.category_display}
          </span>
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
        -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </Link>
  );
};

export default CarCard;