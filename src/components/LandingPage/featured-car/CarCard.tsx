// components/featured-cars/CarCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { FeaturedCar } from './types';
import { buildImageUrl } from '../../../utils/imageUrlBuilder';
import { formatPrice } from '../../../utils/priceFormatter';

interface CarCardProps {
  car: FeaturedCar;
  isDarkMode: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, isDarkMode }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `https://via.placeholder.com/400x300/${isDarkMode ? '333' : 'eee'}/${isDarkMode ? '000' : '666'}?text=${car.manufacturer_name}`;
  };

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <Link
      to={`/car/${car.id}`}
      className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        isDarkMode 
          ? 'bg-gray-800/60 border border-gray-700' 
          : 'bg-white border border-gray-200'
      }`}
    >
      {/* Car Image */}
      <div className="relative h-48 w-full overflow-hidden">
        {car.main_image_url ? (
          <img
            src={buildImageUrl(car.main_image_url)}
            alt={`${car.manufacturer_name} ${car.model_name}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={handleImageError}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              {car.manufacturer_name}
            </span>
          </div>
        )}
        
        {/* Featured Badge */}
        {car.featured && (
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              isDarkMode 
                ? 'bg-yellow-900/80 text-yellow-200' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              Featured
            </span>
          </div>
        )}
        
        {/* Manufacturer Logo */}
        {car.manufacturer_logo && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 p-1">
            <img
              src={buildImageUrl(car.manufacturer_logo)}
              alt={car.manufacturer_name}
              className="w-full h-full object-contain"
              onError={handleLogoError}
            />
          </div>
        )}
      </div>

      {/* Car Info */}
      <div className="p-4">
        {/* Manufacturer and Model */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className={`font-bold text-lg truncate ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.manufacturer_name} {car.model_name}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {car.variant} • {car.model_year}
            </p>
          </div>
          
          {/* Category Badge */}
          <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {car.category_display}
          </span>
        </div>

        {/* Price with Birr symbol */}
        <div className={`font-bold text-lg mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {formatPrice(car.base_price)}
        </div>

        {/* Car Specs */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          }`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Range
            </div>
            <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {car.range_wltp} km
            </div>
          </div>
          
          <div className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          }`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              0-100 km/h
            </div>
            <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {car.acceleration_0_100}s
            </div>
          </div>
          
          <div className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          }`}>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Power
            </div>
            <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {car.motor_power} HP
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-3 pt-3 border-t border-gray-700/30 dark:border-gray-300/30">
          <div className="flex items-center justify-between">
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {car.status_display}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${
              car.status === 'available' 
                ? isDarkMode 
                  ? 'bg-green-900/30 text-green-300' 
                  : 'bg-green-100 text-green-700'
                : isDarkMode 
                  ? 'bg-red-900/30 text-red-300' 
                  : 'bg-red-100 text-red-700'
            }`}>
              {car.status}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </Link>
  );
};

export default CarCard;