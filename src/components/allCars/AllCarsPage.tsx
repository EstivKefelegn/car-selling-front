// pages/AllCarsPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import StandaloneFilter from '../FilterCard/StandaloneFilter';
import AllCarsGrid from './AllCarsGrid'; // Make sure this imports your AllCarsGrid component
import type { CarFilter } from '../../services/filters';
import { useDarkModeStore } from '../../store/useDarkModeStore';

const AllCarsPage: React.FC = () => {
  const [filters, setFilters] = useState<CarFilter>({});
  const { isDarkMode } = useDarkModeStore();
  const location = useLocation();

  // Extract search from URL when component loads
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    
    if (searchParam) {
      const decodedQuery = decodeURIComponent(searchParam);
      // Set the search query in filters
      setFilters(prev => ({
        ...prev,
        search: decodedQuery
      }));
    }
  }, [location.search]);

  // const handleFilterChange = (newFilters: CarFilter) => {
  //   setFilters(newFilters);
  // };

  return (
    <div className="min-h-screen">
      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 ${
        isDarkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        {/* Main Content - Full width */}
        <div className="lg:col-span-4">
          <div className="p-4 lg:p-6">
            <AllCarsGrid 
              initialFilters={filters}
              title="All Electric Cars"
              itemsPerPage={20}
              showSearchHeader={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCarsPage;