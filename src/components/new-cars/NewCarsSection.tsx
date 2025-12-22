// components/new-cars/NewCarsSection.tsx
import React from 'react';
import useNewCars from '../../hooks/cars/useNewCars';
import NewCarsGrid from './NewCarsGrid';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorMessage from '../../utils/ErrorMessage';
import { useTranslation } from 'react-i18next';

interface NewCarsSectionProps {
  limit?: number;
  title?: string;
  subtitle?: string;
}

const NewCarsSection: React.FC<NewCarsSectionProps> = ({ 
  limit = 10,
  title,
  subtitle
}) => {
  const { newCars, isLoading, error, totalCount } = useNewCars(limit);
  const { t } = useTranslation();

  // Use provided title/subtitle or fallback to translations
  const sectionTitle = title || t('newelyCommingCars.title');
  const sectionSubtitle = subtitle || t('newelyCommingCars.subtitle');

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
        message={t('newelyCommingCars.error.message')}
        error={error}
        retryText={t('newelyCommingCars.error.retry')}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <NewCarsGrid
      cars={newCars}
      title={sectionTitle}
      subtitle={sectionSubtitle}
      limit={limit}
      showViewAll={totalCount > limit}
    />
  );
};

export default NewCarsSection;