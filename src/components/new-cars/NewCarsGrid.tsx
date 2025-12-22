import React from 'react';
import type { Car } from '../../hooks/cars/useEVCars';
import CompactCarCard from './CompactCarCard';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { Link } from 'react-router-dom';
import FindCarsButton from '../../utils/FindCars';
import { useTranslation } from 'react-i18next';

interface NewCarsGridProps {
  cars: Car[];
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
}

const NewCarsGrid: React.FC<NewCarsGridProps> = ({
  cars,
  title: titleKey = 'new_cars.title',
  subtitle: subtitleKey = 'new_cars.subtitle',
  limit,
  showViewAll = true,
}) => {
  const { isDarkMode } = useDarkModeStore();
  const { t } = useTranslation();

  // Apply limit if specified
  const displayCars = limit ? cars.slice(0, limit) : cars;

  if (displayCars.length === 0) {
    return (
      <div className={`text-center py-12 rounded-2xl ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
      }`}>
        <h3 className={`text-xl font-semibold mb-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {t('new_cars.no_new_cars')}
        </h3>
        <p className={isDarkMode ? 'text-gray-500' : 'text-gray-600'}>
          {t('new_cars.check_back_soon')}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t(titleKey)}
          </h2>
          {subtitleKey && (
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {t(subtitleKey)}
            </p>
          )}
        </div>

        {showViewAll && (
          <Link to="/cars">
            <FindCarsButton isDark={isDarkMode} text={t('new_cars.view_all')} style='mx-6'/>
          </Link>
        )}
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayCars.map((car) => (
          <CompactCarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Count Display */}
      <div className={`mt-6 pt-6 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          {t('new_cars.showing_count', { displayed: displayCars.length, total: cars.length })}
        </p>
      </div>
    </div>
  );
};

export default NewCarsGrid;
