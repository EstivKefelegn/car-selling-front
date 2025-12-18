// pages/finance/components/ErrorState.tsx
import React from 'react';
import ErrorMessage from '../../../utils/ErrorMessage';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <ErrorMessage 
      message="Failed to load finance page"
      error={error}
      retryText="Try Again"
      onRetry={onRetry}
    />
  );
};

export default ErrorState;