import React, { useState } from 'react';
import type { CarFilter } from '../services/filters';
import FilterCard from './FilterCard';

interface StandaloneFilterProps {
  onFilterChange: (filters: CarFilter) => void;
  initialFilters?: CarFilter;
  title?: string;
  description?: string;
}

const StandaloneFilter: React.FC<StandaloneFilterProps> = ({
  onFilterChange,
  initialFilters = {},
  title = "Find Your Perfect Electric Car",
  description = "Use our filters to narrow down your search and find the electric vehicle that matches your needs."
}) => {
  const [filters, setFilters] = useState<CarFilter>(initialFilters);

  const handleFilterChange = (newFilters: CarFilter) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 mb-6">
           <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Car icon */}
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>


          </div>
          <h2 className="text-3xl md:text-2xl text-gray-600 dark:text-gray-100 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Filter Card */}
        <div className="max-w-4xl mx-auto">
          <FilterCard 
            onFilterChange={handleFilterChange}
            initialFilters={filters}
            showTitle={true}
            compact={false}
            standalone={true}
          />
        </div>

        {/* Results Summary (Optional) */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start filtering to see matching vehicles
          </p>
        </div>
      </div>
    </div>
  );
};

export default StandaloneFilter;