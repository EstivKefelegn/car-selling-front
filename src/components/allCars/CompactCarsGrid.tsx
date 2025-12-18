// components/cars/CompactCarsGrid.tsx
import React from 'react';
import type { Car } from '../../hooks/cars/useEVCars';
import ShortCarCard from './ShortCarCard';
import { useDarkModeStore } from '../../store/useDarkModeStore';

interface CompactCarsGridProps {
  cars: Car[];
  title?: string;
  subtitle?: string;
  itemsPerPage?: number;
  showPagination?: boolean;
}

const CompactCarsGrid: React.FC<CompactCarsGridProps> = ({
  cars,
  title = 'All Electric Cars',
  subtitle,
  itemsPerPage = 12,
  showPagination = true,
}) => {
  const { isDarkMode } = useDarkModeStore();
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = cars.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cars.length === 0) {
    return (
      <div
        className={`text-center py-12 rounded-2xl ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          No cars found
        </h3>
        <p className={isDarkMode ? 'text-gray-500' : 'text-gray-600'}>
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <div>
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {title}
            </h2>
            {subtitle && (
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {subtitle}
              </p>
            )}
          </div>
          <div
            className={`text-sm px-3 py-1.5 rounded-full ${
              isDarkMode
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {cars.length} car{cars.length !== 1 ? 's' : ''} total
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {currentCars.map((car) => (
          <ShortCarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Showing {startIndex + 1} - {Math.min(endIndex, cars.length)} of{' '}
            {cars.length} cars
          </div>

          <div className="flex items-center space-x-1">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
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

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNumber
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
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
    </div>
  );
};

export default CompactCarsGrid;