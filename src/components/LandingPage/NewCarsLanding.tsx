// In your main page or layout
import React, { useState } from 'react';
import StandaloneFilter from '../FilterCard/StandaloneFilter';
import AllCarsLanding from '../carsLanding/AllCarsLanding';
import type { CarFilter } from '../../services/filters';
import {useDarkModeStore} from "../../store/useDarkModeStore"

const NewCarsLanding: React.FC = () => {
  const [filters, setFilters] = useState<CarFilter>({});
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  


  const handleFilterChange = (newFilters: CarFilter) => {
    setFilters(newFilters);
    // You could redirect to a search results page or update state
    console.log('Filters applied:', newFilters);
  };

  return (
    <div>
      {/* Standalone Filter Section */}
      {/* <StandaloneFilter 
        onFilterChange={handleFilterChange}
        initialFilters={filters}
        title="Find Your Perfect Electric Car"
        description="Filter by manufacturer, model, year, price, color (interior & exterior), and more"
      />
      
      {/* Featured Cars Section */}
      {/* <FeaturedCarsLanding /> */}
      
      {/* Or use filter with cars list */}
     <div
    className={`grid grid-cols-1 lg:grid-cols-4 gap-8 ${
      isDarkMode
        ? "bg-gray-900"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900"
    }`}
  >
  {/* Filter (Does NOT Scroll) */}
   <div className="lg:col-span-1 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <StandaloneFilter 
      onFilterChange={handleFilterChange}
      initialFilters={filters}
      title="Find Your Perfect Electric Car"
      description="Filter by manufacturer, model, year, price, color (interior & exterior), and more"
    />
  </div>
        <div className="lg:col-span-3">
    <AllCarsLanding />
  </div>
      </div>
    </div>
  );
};

export default NewCarsLanding;