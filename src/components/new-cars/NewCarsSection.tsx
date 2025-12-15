// components/new-cars/NewCarsSection.tsx
import React from 'react';
import useNewCars from '../../hooks/useNewCars';
import NewCarsGrid from './NewCarsGrid';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorMessage from '../../utils/ErrorMessage';

interface NewCarsSectionProps {
  limit?: number;
  title?: string;
  subtitle?: string;
}

const NewCarsSection: React.FC<NewCarsSectionProps> = ({ 
  limit = 4,
  title = "Newly Added Cars",
  subtitle = "Latest arrivals in our EV collection"
}) => {
  const { newCars, isLoading, error, totalCount } = useNewCars(limit);

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        message="Failed to load new cars"
        error={error}
        retryText="Try Again"
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <NewCarsGrid
      cars={newCars}
      title={title}
      subtitle={subtitle}
      limit={limit}
      showViewAll={totalCount > limit}
    />
  );
};

export default NewCarsSection;