// components/cars/CompactCarCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { Car } from '../../hooks/useEVCars';
import { buildImageUrl } from '../../utils/imageUrlBuilder';
import { formatPrice } from '../../utils/priceFormatter';
import { useDarkModeStore } from '../../store/useDarkModeStore';

interface CompactCarCardProps {
  car: Car;
}

const CompactCarCard: React.FC<CompactCarCardProps> = ({ car }) => {
  const { isDarkMode } = useDarkModeStore();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `https://via.placeholder.com/300x150/${
      isDarkMode ? '333' : 'eee'
    }/${isDarkMode ? '000' : '666'}?text=${car.manufacturer_name}+${car.model_name}`;
  };

  return (
    <Link
      to={`/car/${car.slug}`}
      className={`group block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full border ${
        isDarkMode
          ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Image Container */}
      <div className="relative h-32 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
        {car.main_image_url ? (
          <img
            src={buildImageUrl(car.main_image_url)}
            alt={`${car.manufacturer_name} ${car.model_name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className={`font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {car.manufacturer_name}
            </span>
          </div>
        )}
        
        {/* New Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            isDarkMode
              ? 'bg-blue-600 text-white'
              : 'bg-blue-500 text-white'
          }`}>
            NEW
          </span>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            car.status === 'available'
              ? isDarkMode
                ? 'bg-green-700 text-green-100'
                : 'bg-green-100 text-green-800'
              : isDarkMode
              ? 'bg-red-700 text-red-100'
              : 'bg-red-100 text-red-800'
          }`}>
            {car.status === 'available' ? 'AVAILABLE' : 'SOLD'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className={`font-bold text-sm mb-1 truncate ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {car.manufacturer_name} {car.model_name}
        </h3>
        
        {/* Details */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {car.variant} • {car.model_year}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            isDarkMode
              ? 'bg-gray-700 text-gray-300'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {car.category_display}
          </span>
        </div>

        {/* Price */}
        <div className={`font-bold text-base mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {formatPrice(car.base_price)}
        </div>

        {/* Quick Specs */}
        <div className="grid grid-cols-3 gap-1 text-center">
          <div className={`p-1 rounded ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>Range</div>
            <div className={`font-semibold text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {car.range_wltp}km
            </div>
          </div>
          
          <div className={`p-1 rounded ${isDarkMode ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-purple-600'}`}>0-100</div>
            <div className={`font-semibold text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {car.acceleration_0_100}s
            </div>
          </div>
          
          <div className={`p-1 rounded ${isDarkMode ? 'bg-gray-700/50' : 'bg-green-50'}`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-green-600'}`}>Power</div>
            <div className={`font-semibold text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {car.motor_power}HP
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </Link>
  );
};

export default CompactCarCard;