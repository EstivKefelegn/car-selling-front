// components/popular-brands/hooks/useBrandSelection.ts
import { useState, useCallback } from 'react';

export const useBrandSelection = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleBrandClick = useCallback((brandName: string) => {
    setSelectedBrand(prev => prev === brandName ? null : brandName);
  }, []);

  const handleCloseModels = useCallback(() => {
    setSelectedBrand(null);
  }, []);

  const handleModelClick = useCallback((modelName: string, brandName: string) => {
    if (modelName === 'No models found') return;
    window.location.href = `/all-cars?manufacturer=${encodeURIComponent(brandName)}&model=${encodeURIComponent(modelName)}`;
  }, []);

  return {
    selectedBrand,
    handleBrandClick,
    handleCloseModels,
    handleModelClick
  };
};