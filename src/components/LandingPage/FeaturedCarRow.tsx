// components/FeaturedCarsRow.tsx
import React from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { Link } from 'react-router-dom';
import useFeaturedCars from '../../hooks/useFeaturedCars'; // Adjust import path as needed

// Define the car type based on your API response
interface CarColor {
  id: number;
  name: string;
  hex_code: string;
  type: 'exterior' | 'interior';
}

interface FeaturedCar {
  id: number;
  slug: string;
  manufacturer_name: string;
  manufacturer_logo: string;
  model_name: string;
  variant: string;
  model_year: number;
  category: string;
  category_display: string;
  status: string;
  status_display: string;
  featured: boolean;
  range_wltp: number;
  acceleration_0_100: string;
  motor_power: number;
  base_price: string;
  main_image_url: string;
  efficiency: number;
  total_configurations: number;
  created_at: string;
  available_exterior_colors: CarColor[];
  available_interior_colors: CarColor[];
}

const FeaturedCarsRow: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  
  // Use the useFeaturedCars hook with limit parameter
  const { featuredCars, isLoading, error } = useFeaturedCars(4);

  // Format price function with Birr currency
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return 'Price N/A';
    
    // Format with Birr currency symbol
    if (numPrice >= 10000000) {
      return `Br ${(numPrice / 10000000).toFixed(2)} Cr`;
    } else if (numPrice >= 100000) {
      return `Br ${(numPrice / 100000).toFixed(2)} L`;
    } else if (numPrice >= 1000) {
      return `Br ${(numPrice / 1000).toFixed(2)} K`;
    } else {
      return `Br ${numPrice.toLocaleString()}`;
    }
  };

  // Helper to build image URL
  const buildImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Otherwise, prepend backend URL (adjust as needed)
    // You might want to make this configurable via environment variable
    const backendUrl = 'http://localhost:8000';
    return `${backendUrl}${imagePath}`;
  };

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Cars
          </h2>
          <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            View All →
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden animate-pulse ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}
            >
              <div className="h-48 w-full bg-gray-300 dark:bg-gray-700" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Cars
          </h2>
          <Link
            to="/all-cars"
            className={`text-sm font-medium transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            View All →
          </Link>
        </div>
        
        <div className={`rounded-xl p-6 text-center ${
          isDarkMode 
            ? 'bg-red-900/20 border border-red-800 text-red-300' 
            : 'bg-red-50 border border-red-200 text-red-600'
        }`}>
          <p>Failed to load featured cars</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!featuredCars || featuredCars.length === 0) {
    return (
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Cars
          </h2>
          <Link
            to="/all-cars"
            className={`text-sm font-medium transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            View All →
          </Link>
        </div>
        
        <div className={`rounded-xl p-6 text-center ${
          isDarkMode 
            ? 'bg-gray-800/50 text-gray-400' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <p>No featured cars available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured Cars
        </h2>
        <Link
          to="/all-cars"
          className={`text-sm font-medium transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          View All →
        </Link>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCars.slice(0, 4).map((car) => (
          <Link
            key={car.id}
            to={`/car/${car.slug}`}
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
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://via.placeholder.com/400x300/${isDarkMode ? '333' : 'eee'}/${isDarkMode ? '000' : '666'}?text=${car.manufacturer_name}`;
                  }}
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
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
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
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarsRow;