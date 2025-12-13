// components/FeaturedCarsRow.tsx
import React from 'react';
import { useDarkModeStore } from '../../../store/useDarkModeStore';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import SectionHeader from './SectionHeader';
import CarsGrid from './CarsGrid';
import { useFeaturedCarsData } from '../../../hooks/useFeaturedCarsData';

const FeaturedCarsRow: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  
  const { featuredCars, isLoading, error, hasCars } = useFeaturedCarsData();

  if (isLoading) {
    return <LoadingState isDarkMode={isDarkMode} />;
  }

  if (error) {
    return <ErrorState error={error} isDarkMode={isDarkMode} />;
  }

  if (!hasCars) {
    return <EmptyState isDarkMode={isDarkMode} />;
  }

  return (
    <div className="py-6">
      <SectionHeader isDarkMode={isDarkMode} />
      <CarsGrid cars={featuredCars!} isDarkMode={isDarkMode} />
    </div>
  );
};

export default FeaturedCarsRow;