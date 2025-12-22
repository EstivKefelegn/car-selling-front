import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderSectionProps {
  isDarkMode: boolean;
  activeFilterCount: number;
  filteredCarsCount: number;
  totalCarsCount: number;
  filters: {
    manufacturer?: string;
    model?: string;
  };
  filterInfo: {
    priceFilterText: string;
    hasColorFilters: boolean;
    exteriorColorsText: string;
    interiorColorsText: string;
    isPriceFilterActive: boolean;
    exteriorColorsCount: number;
    interiorColorsCount: number;
  };
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  isDarkMode,
  activeFilterCount,
  filteredCarsCount,
  totalCarsCount,
  filters,
  filterInfo
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-12 flex flex-col items-center text-center">
      <h2
        className={`text-3xl md:text-4xl mb-4 font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {t('allCars.title')}
      </h2>

      {activeFilterCount > 0 && (
        <div
          className={`text-sm px-4 py-2 rounded-full mb-4 ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {t('allCars.showing', {
            filtered: filteredCarsCount,
            total: totalCarsCount
          })}
          {' '}
          {t(
            activeFilterCount === 1
              ? 'allCars.filtersApplied'
              : 'allCars.filtersApplied_plural',
            { count: activeFilterCount }
          )}
        </div>
      )}

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.manufacturer && (
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                isDarkMode
                  ? 'bg-gray-800/70 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t('allCars.manufacturer')}: {filters.manufacturer}
            </span>
          )}

          {filters.model && (
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                isDarkMode
                  ? 'bg-gray-800/70 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t('allCars.model')}: {filters.model}
            </span>
          )}

          {filterInfo.isPriceFilterActive && (
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                isDarkMode
                  ? 'bg-gray-800/70 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t('allCars.price')}: {filterInfo.priceFilterText}
            </span>
          )}

          {filterInfo.hasColorFilters && (
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                isDarkMode
                  ? 'bg-gray-800/70 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t('allCars.colors')}:
              {filterInfo.exteriorColorsCount > 0 && (
                <span className="ml-1">
                  {t('allCars.exterior')}: {filterInfo.exteriorColorsText}
                </span>
              )}
              {filterInfo.interiorColorsCount > 0 && (
                <span className="ml-1">
                  {t('allCars.interior')}: {filterInfo.interiorColorsText}
                </span>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSection;