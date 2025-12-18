// pages/finance/components/LoadingState.tsx
import React from 'react';
import LoadingSpinner from '../../../utils/LoadingSpinner';

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
};

export default LoadingState;