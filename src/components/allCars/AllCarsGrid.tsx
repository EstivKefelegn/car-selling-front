// components/cars/AllCarsGrid.tsx
import React, { useState, useEffect } from 'react';
import useEVCars from '../../hooks/useEVCars';
import type { CarFilter } from '../../services/filters';
import ShortCarCard from './ShortCarCard';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { useLocation } from 'react-router-dom';

interface AllCarsGridProps {
  initialFilters?: CarFilter;
  title?: string;
  itemsPerPage?: number;
  showSearchHeader?: boolean;
}

const AllCarsGrid: React.FC<AllCarsGridProps> = ({
  initialFilters = {},
  title = 'All Electric Cars',
  itemsPerPage = 20,
  showSearchHeader = false,
}) => {
  const { isDarkMode } = useDarkModeStore();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CarFilter>(initialFilters);

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    
    if (searchParam) {
      const decodedQuery = decodeURIComponent(searchParam);
      setSearchQuery(decodedQuery);
      
      // Update filters with search
      setFilters(prev => ({
        ...prev,
        search: decodedQuery
      }));
    } else {
      setSearchQuery('');
    }
  }, [location.search]);

  // Fetch cars with filters
  const { data: cars, loading, error } = useEVCars(filters);

  // Calculate pagination
  const totalCars = cars?.length || 0;
  const totalPages = Math.ceil(totalCars / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = cars?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    window.history.pushState({}, '', '/all-cars');
    setSearchQuery('');
    const { search, ...restFilters } = filters;
    setFilters(restFilters);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          isDarkMode ? 'border-blue-500' : 'border-blue-600'
        }`}></div>
        <span className={`ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Loading cars...
        </span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`text-center py-12 rounded-xl ${
        isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
      }`}>
        <div className="mb-4">
          <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.196 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${
          isDarkMode ? 'text-red-300' : 'text-red-800'
        }`}>
          Failed to load cars
        </h3>
        <p className={`mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
          {/* {error.message || 'Network error'} */}
          Network error
        </p>
        <button
          onClick={() => window.location.reload()}
          className={`px-4 py-2 rounded-lg font-medium ${
            isDarkMode
              ? 'bg-red-700 hover:bg-red-600 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {searchQuery ? `Search: "${searchQuery}"` : title}
          </h1>
          <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {searchQuery 
              ? `${totalCars} result${totalCars !== 1 ? 's' : ''} found`
              : `${totalCars} car${totalCars !== 1 ? 's' : ''} available`
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Clear Search
            </button>
          )}
          
          {totalCars > 0 && (
            <div className={`px-3 py-1.5 text-sm rounded-full ${
              isDarkMode
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}>
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>

      {/* Cars Grid */}
      {totalCars > 0 ? (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {currentCars.map((car) => (
              <ShortCarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {startIndex + 1} - {Math.min(endIndex, totalCars)} of {totalCars}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? isDarkMode
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ← Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? isDarkMode
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-500 text-white'
                            : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? isDarkMode
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={`text-center py-12 rounded-xl ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
        }`}>
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {searchQuery ? 'No matching cars found' : 'No cars available'}
          </h3>
          <p className={isDarkMode ? 'text-gray-500' : 'text-gray-600'}>
            {searchQuery 
              ? `No results found for "${searchQuery}"`
              : 'Try adjusting your filters or check back later'
            }
          </p>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className={`mt-4 px-4 py-2 rounded-lg font-medium ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              View All Cars
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCarsGrid;