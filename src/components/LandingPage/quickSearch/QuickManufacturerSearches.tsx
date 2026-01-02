import React from 'react';
import useManufacturer, { type Manufacturer, type ManufacturerQuery } from '../../../hooks/manufacturer/useManufacturers';
import { useDarkModeStore } from '../../../store/useDarkModeStore';
import type { QuickManufacturerSearchesProps } from './types';
import SectionTitle from './SectionTitle';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import ManufacturerGrid from './ManufaturerGrid';
import ShowMoreButton from './ShowMoreButton';
import { useManufacturerData } from '../../../hooks/manufacturer/useManufacturerData';
import { useTranslation } from 'react-i18next';

const QuickManufacturerSearches: React.FC<QuickManufacturerSearchesProps> = ({
  title,
  maxItems = 12,
}) => {
  const { isDarkMode } = useDarkModeStore();
  const { t } = useTranslation();

  // Set up manufacturer query to fetch all manufacturers
  const manufacturerQuery: ManufacturerQuery = {
    name: '',
    is_ev_only: undefined,
    country: undefined,
    founded_year: undefined
  };

  const { data: manufacturers, loading, error } = useManufacturer(manufacturerQuery);
  
  const { showAll, filteredManufacturers, displayManufacturers, toggleShowAll } = 
    useManufacturerData(manufacturers, maxItems);

  const handleManufacturerClick = (manufacturer: Manufacturer) => {
    window.location.href = `/cars?search=${encodeURIComponent(manufacturer.name)}`;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle 
          title={title ?? t('quickSearches')}
          subtitle={t('browseCarsByManufacturer')}
          isDarkMode={isDarkMode}
        />

        {/* Loading State */}
        {loading && <LoadingState isDarkMode={isDarkMode} />}

        {/* Error State */}
        {error && <ErrorState isDarkMode={isDarkMode} />}

        {/* Manufacturer Content */}
        {!loading && !error && (
          <>
            {displayManufacturers.length > 0 ? (
              <>
                <ManufacturerGrid
                  manufacturers={displayManufacturers}
                  isDarkMode={isDarkMode}
                  onManufacturerClick={handleManufacturerClick}
                />

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
