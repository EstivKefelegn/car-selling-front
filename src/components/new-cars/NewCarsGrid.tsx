// components/new-cars/NewCarsGrid.tsx
import React from 'react';
import type { Car } from '../../hooks/useEVCars';
import CompactCarCard from './CompactCarCard';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { Link } from 'react-router-dom';
import FindCarsButton from '../../utils/FindCars';

interface NewCarsGridProps {
  cars: Car[];
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
}

const NewCarsGrid: React.FC<NewCarsGridProps> = ({
  cars,
  title = "Newly Added Cars",
  subtitle = "Latest arrivals in our EV collection",
  limit,
  showViewAll = true,
}) => {
  const { isDarkMode } = useDarkModeStore();
  
  // Apply limit if specified
  const displayCars = limit ? cars.slice(0, limit) : cars;

  if (displayCars.length === 0) {
    return (
      <div className={`text-center py-12 rounded-2xl ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
      }`}>
        <h3 className={`text-xl font-semibold mb-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          No new cars available
        </h3>
        <p className={isDarkMode ? 'text-gray-500' : 'text-gray-600'}>
          Check back soon for new arrivals!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {subtitle}
            </p>
          )}
        </div>
        
        {showViewAll && (
          <Link
            to="/cars"
            // className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
            //   isDarkMode
            //     ? 'bg-blue-600 hover:bg-blue-700 text-white'
            //     : 'bg-blue-500 hover:bg-blue-600 text-white'
            // }`}
          >
            <FindCarsButton isDark={isDarkMode} text='View All New Cars' style='mx-6'/>
            {/* View All New Cars */}
            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg> */}
          </Link>
        )}
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayCars.map((car) => (
          <CompactCarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Count Display */}
      <div className={`mt-6 pt-6 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          Showing {displayCars.length} of {cars.length} new cars
        </p>
      </div>
    </div>
  );
};

export default NewCarsGrid;