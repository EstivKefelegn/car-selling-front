import React from 'react';
import useFeaturedCars from '../hooks/useFeaturesCars';
import { useDarkModeStore } from '../store/useDarkModeStore';
import useCarFilterStore from '../store/useCarFilterStore'; // Add this import

const API_BASE_URL = 'http://localhost:8000';

const FeaturedCarsLanding: React.FC = () => {
  const { filters } = useCarFilterStore(); // Get filters from store
  const { featuredCars, loading, error } = useFeaturedCars();
  const { isDarkMode } = useDarkModeStore();

  // Filter cars based on store filters
  const filteredCars = React.useMemo(() => {
    if (!featuredCars) return [];
    
    return featuredCars.filter(car => {
      // If no filters, show all cars
      if (Object.keys(filters).length === 0) return true;
      
      // Manufacturer filter
      if (filters.manufacturer && car.manufacturer_name !== filters.manufacturer) {
        return false;
      }
      
      // Model filter
      if (filters.model && car.model_name !== filters.model) {
        return false;
      }
      
      // Year range filter
      if (filters.minYear && car.model_year < filters.minYear) {
        return false;
      }
      if (filters.maxYear && car.model_year > filters.maxYear) {
        return false;
      }
      
      // Price range filter
      if (filters.minPrice && car.base_price_value < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && car.base_price_value > filters.maxPrice) {
        return false;
      }
      
      // Category filter
      if (filters.category && car.category !== filters.category) {
        return false;
      }
      
      // Featured filter
      if (filters.featured && !car.featured) {
        return false;
      }
      
      // Color filter - assuming car has color_ids property
      if (filters.colors && filters.colors.length > 0) {
        // You'll need to adapt this based on your car data structure
        // This is just an example
        if (car.color_ids) {
          const carColors = Array.isArray(car.color_ids) ? car.color_ids : [car.color_ids];
          const hasMatchingColor = carColors.some((colorId: number) => 
            filters.colors?.includes(colorId)
          );
          if (!hasMatchingColor) return false;
        }
      }
      
      return true;
    });
  }, [featuredCars, filters]);

  // Count active filters
  const activeFilterCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof typeof filters];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== '';
  }).length;

  if (loading) {
    return (
      <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-800'} mb-4`}></div>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Loading featured cars...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg`}>
        <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
          Error loading featured cars
        </p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {error}
        </p>
      </div>
    );
  }

  if (!filteredCars || filteredCars.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <svg className="w-20 h-20 mx-auto mb-6 text-gray-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {activeFilterCount > 0 ? 'No matching cars found' : 'No featured cars available'}
        </p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          {activeFilterCount > 0 
            ? 'Try adjusting your filters to see more results' 
            : 'Check back soon for new featured vehicles'}
        </p>
      </div>
    );
  }

  return (
    <div className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with filter count */}
        <div className="mb-12 flex flex-col items-center">
          <h2
            className={`text-3xl md:text-4xl mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            New Arrival Electric Vehicles
          </h2>
          
          {activeFilterCount > 0 && (
            <div className={`text-sm px-4 py-2 rounded-full mb-4 ${
              isDarkMode 
                ? 'bg-gray-800 text-gray-300' 
                : 'bg-gray-200 text-gray-700'
            }`}>
              Showing {filteredCars.length} of {featuredCars?.length || 0} cars 
              ({activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied)
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div 
              key={car.id} 
              className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50' 
                  : 'bg-white border border-gray-200/80 hover:border-gray-300/50'
              }`}
            >
              {/* Featured Ribbon */}
              <div className="absolute top-6 -right-10 rotate-45 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs font-bold px-12 py-1 z-10">
                FEATURED
              </div>

              {/* Image container */}
              <div className="relative h-72 overflow-hidden">
                {car.main_image_url ? (
                  <>
                    <img 
                      src={`${API_BASE_URL}${car.main_image_url}`} 
                      alt={`${car.manufacturer_name} ${car.model_name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    
                    {/* Dark overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-800/40 to-transparent"></div>
                    
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </>
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                  }`}>
                    <svg className="w-20 h-20 text-gray-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </div>
                )}
                
                {/* Year badge */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-gray-300 font-bold px-3 py-1 rounded-full text-sm">
                  {car.model_year}
                </div>
              </div>
              
              {/* Car Info */}
              <div className={`p-6 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white'}`}>
                {/* Manufacturer and Model */}
                <div className="flex items-center mb-4">
                  {car.manufacturer_logo && (
                    <div className="mr-3 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                      <img 
                        src={`${API_BASE_URL}${car.manufacturer_logo}`}
                        alt={car.manufacturer_name}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {car.manufacturer_name} <span className="text-gray-700 dark:text-gray-400">{car.model_name}</span>
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {car.variant} • {car.category_display}
                    </p>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className={`text-center p-3 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-gray-700' 
                      : 'bg-gradient-to-b from-gray-800/5 to-gray-900/5 border-gray-300'
                  }`}>
                    <p className={`text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-800'
                    }`}>
                      RANGE
                    </p>
                    <p className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {car.range_wltp}<span className="text-sm">km</span>
                    </p>
                  </div>
                  <div className={`text-center p-3 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-gray-700' 
                      : 'bg-gradient-to-b from-gray-800/5 to-gray-900/5 border-gray-300'
                  }`}>
                    <p className={`text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-800'
                    }`}>
                      POWER
                    </p>
                    <p className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {car.motor_power}<span className="text-sm">HP</span>
                    </p>
                  </div>
                  <div className={`text-center p-3 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-gray-700' 
                      : 'bg-gradient-to-b from-gray-800/5 to-gray-900/5 border-gray-300'
                  }`}>
                    <p className={`text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-800'
                    }`}>
                      0-100
                    </p>
                    <p className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {car.acceleration_0_100}<span className="text-sm">s</span>
                    </p>
                  </div>
                </div>
                
                {/* Efficiency */}
                <div className={`mb-6 p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-gray-800/40 to-gray-900/40 border-gray-700' 
                    : 'bg-gradient-to-r from-gray-800/5 to-gray-900/5 border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-800'
                      }`}>
                        Efficiency
                      </p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400/80' : 'text-gray-600/80'
                      }`}>
                        WLTP Combined
                      </p>
                    </div>
                    <p className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {car.efficiency} <span className="text-sm">km/kWh</span>
                    </p>
                  </div>
                  <div className={`mt-2 h-2 rounded-full overflow-hidden ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}>
                    <div 
                      className="h-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-full"
                      style={{ width: `${Math.min(car.efficiency * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Price and CTA */}
                <div className={`pt-6 border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Starting from
                      </p>
                      <p className={`text-2xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {car.base_price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {car.total_configurations} configuration
                        {car.total_configurations !== 1 ? 's' : ''}
                      </p>
                      <p className={`text-xs font-medium ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {car.status_display}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:scale-105
                      bg-gradient-to-r from-gray-800 to-gray-900 text-white group relative`}>
                      <div className="relative z-10">View Details</div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                    <button className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 border
                      ${isDarkMode 
                        ? 'border-gray-700 text-gray-300 hover:bg-gray-800 active:bg-gray-900' 
                        : 'border-gray-800 text-gray-800 hover:bg-gray-50 active:bg-gray-100'
                      }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Hover effect line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        {filteredCars.length > 0 && (
          <div className="text-center mt-12">
            <button className={`inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 group overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105
              bg-gradient-to-r from-gray-800 to-gray-900 text-white relative`}>
              <div className="relative z-10 flex items-center space-x-2">
                <span>View All Vehicles</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCarsLanding;