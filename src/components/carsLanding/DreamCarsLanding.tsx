import React from 'react';
import useAvailableCars from '../../hooks/cars/useAvailableCars';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useCarFilterStore from '../../store/useCarFilterStore';
import LoadingState from './LoadingState/LoadingState';
import ErrorState from './ErrorState/ErrorState';
import EmptyState from './EmptyState/EmptyState';
import CarCard from './CarCard/CarCard';
import HeaderSection from './HeaderSection/HeaderSection';
import { filterCars, formatPrice } from './utils/helpers';
import { useFilterInfo } from './hooks/useFilterInfo';
import apiClient from '../../services/api-client';

const API_BASE_URL = 'http://localhost:8000';

const AllCarsLanding: React.FC = () => {
  const { filters } = useCarFilterStore();
  const { status: featuredCars, loading, error } = useAvailableCars();
  const { isDarkMode } = useDarkModeStore();
  
  const filteredCars = React.useMemo(() => 
    filterCars(featuredCars || [], filters), 
    [featuredCars, filters]
  );
  
  const filterInfo = useFilterInfo(filters);

  if (loading) return <LoadingState isDarkMode={isDarkMode} />;
  if (error) return <ErrorState error={error} isDarkMode={isDarkMode} />;
  if (!filteredCars || filteredCars.length === 0) {
    return <EmptyState 
      activeFilterCount={filterInfo.activeFilterCount}
      filters={filters}
      isDarkMode={isDarkMode}
      priceFilterText={filterInfo.priceFilterText}
      featuredCars={featuredCars}
    />;
  }

  return (
    <div className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <HeaderSection 
          isDarkMode={isDarkMode}
          activeFilterCount={filterInfo.activeFilterCount}
          filteredCarsCount={filteredCars.length}
          totalCarsCount={featuredCars?.length || 0}
          filters={filters}
          filterInfo={filterInfo}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            
              <CarCard 
                key={car.id}
                car={car}
                isDarkMode={isDarkMode}
                apiBaseUrl={API_BASE_URL}
                formatPrice={formatPrice}
              />
            
          ))}
        </div>

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

export default AllCarsLanding;