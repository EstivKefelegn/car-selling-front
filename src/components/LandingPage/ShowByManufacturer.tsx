import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useManufacturer, { type ManufacturerQuery } from '../../hooks/manufacturer/useManufacturers';
import useEVCars from '../../hooks/cars/useEVCars';
import SectionTitle from './shop-by-manufacturer/SectionTitle';
import LoadingState from './shop-by-manufacturer/LoadingState';
import ErrorState from './shop-by-manufacturer/ErrorState';
import EmptyState from './shop-by-manufacturer/EmptyState';
import ManufacturersGrid from './shop-by-manufacturer/ManufacturerGrid';
import ManufacturerCount from './shop-by-manufacturer/ManufacturerCount';
import { buildImageUrl } from './shop-by-manufacturer/utils/imageUrlBuilder';
import { useManufacturerCarImages } from './shop-by-manufacturer/hooks/useManufacturerCarImage';
import { useScroll } from './shop-by-manufacturer/hooks/useScroll';
import { type ShopByManufacturerProps } from './shop-by-manufacturer/types';

const ShopByManufacturer: React.FC<ShopByManufacturerProps> = ({
  title,
  subtitle,
  maxItems = 12
}) => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkModeStore();

  const manufacturerQuery: ManufacturerQuery = {
    name: '',
    is_ev_only: undefined,
    country: undefined,
    founded_year: undefined
  };

  const { data: manufacturers, loading: manufacturersLoading, error: manufacturersError } = useManufacturer(manufacturerQuery);
  const { data: allCars, loading: carsLoading } = useEVCars({ featured: undefined });
  const { manufacturerCarImages } = useManufacturerCarImages({
    manufacturers,
    allCars,
    manufacturersLoading,
    carsLoading,
    maxItems
  });
  const { scrollLeft, scrollRight } = useScroll();

  const filteredManufacturers = useMemo(() => (manufacturers || []).slice(0, maxItems), [manufacturers, maxItems]);
  const isLoading = manufacturersLoading || carsLoading;

  if (manufacturersError) {
    return <ErrorState isDarkMode={isDarkMode} />;
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle
          title={t('shopByMake')}
          subtitle={t('browseByManufacturer')}
          isDarkMode={isDarkMode}
        />

        {/* Loading State */}
        {isLoading && <LoadingState isDarkMode={isDarkMode} />}

        {/* Manufacturers Grid */}
        {!isLoading && filteredManufacturers.length > 0 && (
          <>
            <ManufacturersGrid
              manufacturers={filteredManufacturers}
              manufacturerCarImages={manufacturerCarImages}
              isDarkMode={isDarkMode}
              buildImageUrl={buildImageUrl}
              onScrollLeft={scrollLeft}
              onScrollRight={scrollRight}
            />

            <ManufacturerCount 
              count={filteredManufacturers.length} 
              isDarkMode={isDarkMode} 
            />
          </>
        )}

        {/* Empty State */}
        {!isLoading && filteredManufacturers.length === 0 && (
          <EmptyState isDarkMode={isDarkMode} />
        )}
      </div>
    </section>
  );
};

export default ShopByManufacturer;
