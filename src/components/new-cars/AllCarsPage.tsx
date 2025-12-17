// pages/NewCarsPage.tsx
import React, { useState } from 'react';
import StandaloneFilter from '../FilterCard/StandaloneFilter';
import AllCarsGrid from './AllCarsGrid';
import type { CarFilter } from '../../services/filters';
import { useDarkModeStore } from '../../store/useDarkModeStore';

const NewCarsPage: React.FC = () => {
  const [filters, setFilters] = useState<CarFilter>({});
  const { isDarkMode } = useDarkModeStore();

  const handleFilterChange = (newFilters: CarFilter) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen">
      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-8 ${
        isDarkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <StandaloneFilter 
              onFilterChange={handleFilterChange}
              initialFilters={filters}
              title="Filter New Cars"
              description="Refine your search by specifications"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="p-4 lg:p-6">
            <AllCarsGrid 
              initialFilters={{
                ...filters,
                ordering: '-created_at' 
              }}
              title="New Arrivals"
              itemsPerPage={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCarsPage;