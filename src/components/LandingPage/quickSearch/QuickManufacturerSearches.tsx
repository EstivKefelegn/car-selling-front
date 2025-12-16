// components/QuickManufacturerSearches.tsx
import React from 'react';
import useManufacturer, { type Manufacturer, type ManufacturerQuery } from '../../../hooks/useManufacturers';
import { useDarkModeStore } from '../../../store/useDarkModeStore';
import type { QuickManufacturerSearchesProps } from './types';
import SectionTitle from './SectionTitle';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import ManufacturerGrid from './ManufaturerGrid';
import ShowMoreButton from './ShowMoreButton';
import { useManufacturerData } from '../../../hooks/useManufacturerData';

const QuickManufacturerSearches: React.FC<QuickManufacturerSearchesProps> = ({
  title = "Quick Searches",
  maxItems = 12,
  onManufacturerClick
}) => {
  const { isDarkMode } = useDarkModeStore();

  // Set up manufacturer query to fetch all manufacturers
  const manufacturerQuery: ManufacturerQuery = {
    name: '', // Empty string to get all manufacturers
    is_ev_only: undefined,
    country: undefined,
    founded_year: undefined
  };

  const { data: manufacturers, loading, error } = useManufacturer(manufacturerQuery);
  
  // Use custom hook for manufacturer data logic
  const { showAll, filteredManufacturers, displayManufacturers, toggleShowAll } = 
    useManufacturerData(manufacturers, maxItems);

  const handleManufacturerClick = (manufacturer: Manufacturer) => {
    // if (onManufacturerClick) {
    //   // onManufacturerClick(manufacturer);
    //   getManufacturerSearchUrl(manufacturer.name)
    // } else {
      // Default behavior: navigate to manufacturer page
      window.location.href = `/cars?search=${encodeURIComponent(manufacturer.name)}`;
    // }
  };


  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle 
          title={title}
          subtitle="Browse cars by popular manufacturers"
          isDarkMode={isDarkMode}
        />

        {/* Loading State */}
        {loading && <LoadingState isDarkMode={isDarkMode} />}

        {/* Error State */}
        {error && <ErrorState isDarkMode={isDarkMode} />}

        {/* Manufacturer Content */}
        {!loading && !error && (
          <>
            {/* Manufacturer Grid */}
            {displayManufacturers.length > 0 ? (
              <>
                <ManufacturerGrid
                  manufacturers={displayManufacturers}
                  isDarkMode={isDarkMode}
                  onManufacturerClick={handleManufacturerClick}
                />

                {/* Show More/Less Button */}
                {filteredManufacturers.length > maxItems && (
                  <ShowMoreButton
                    showAll={showAll}
                    isDarkMode={isDarkMode}
                    count={filteredManufacturers.length}
                    onClick={toggleShowAll}
                  />
                )}
              </>
            ) : (
              <EmptyState isDarkMode={isDarkMode} />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default QuickManufacturerSearches;