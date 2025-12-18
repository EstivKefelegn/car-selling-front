// components/PopularBrandsWithModels.tsx
import React from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useManufacturer, { type ManufacturerQuery } from '../../hooks/manufacturer/useManufacturers';
import useEVCars from '../../hooks/cars/useEVCars';
import LoadingState from './popular-brands/LoadingState';
import SectionHeader from './popular-brands/SectionHeader';
import BrandsGrid from './popular-brands/BrandsGrid';
import BrandsList from './popular-brands/BrandList';
import ModelsPanel from './popular-brands/ModelsPanel';
import FooterLinks from './popular-brands/FooterLinks';
import { useBrandModels } from './popular-brands/hooks/useBrandModels';
import { useBrandSelection } from './popular-brands/hooks/useBrandSelection';
import { type PopularBrandsWithModelsProps } from './popular-brands/types';

const PopularBrands: React.FC<PopularBrandsWithModelsProps> = ({
  maxBrands = 7
}) => {
  const { isDarkMode } = useDarkModeStore();

  // Set up manufacturer query to fetch all manufacturers
  const manufacturerQuery: ManufacturerQuery = {
    name: '',
    is_ev_only: undefined,
    country: undefined,
    founded_year: undefined
  };

  const { data: manufacturers, loading: manufacturersLoading } = useManufacturer(manufacturerQuery);
  const { data: allCars, loading: carsLoading } = useEVCars({});

  // Get first N manufacturers
  const manufacturersList = manufacturers ? manufacturers.slice(0, maxBrands) : [];

  // Use custom hooks
  const { brandModels } = useBrandModels({ allCars, manufacturersList });
  const { selectedBrand, handleBrandClick, handleCloseModels, handleModelClick } = useBrandSelection();

  const isLoading = manufacturersLoading || carsLoading;

  if (isLoading) {
    return <LoadingState isDarkMode={isDarkMode} />;
  }

  if (!manufacturersList || manufacturersList.length === 0) {
    return null;
  }

  return (
    <div className={`w-full py-6 border-t ${
      isDarkMode 
        ? 'border-gray-800/50 bg-gray-900/30' 
        : 'border-gray-200/50 bg-gray-50/50'
    } backdrop-blur-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Title */}
          <SectionHeader isDarkMode={isDarkMode} />

          {/* Brands Grid */}
          <BrandsGrid
            brands={manufacturersList}
            selectedBrand={selectedBrand}
            isDarkMode={isDarkMode}
            onBrandClick={handleBrandClick}
          />

          {/* Brands List */}
          <BrandsList brands={manufacturersList} isDarkMode={isDarkMode} />

          {/* Models Panel for Selected Brand */}
          {selectedBrand && brandModels[selectedBrand] && (
            <ModelsPanel
              brandName={selectedBrand}
              models={brandModels[selectedBrand]}
              isDarkMode={isDarkMode}
              onClose={handleCloseModels}
              onModelClick={handleModelClick}
            />
          )}

          {/* Footer Links */}
          <FooterLinks 
            brandsCount={manufacturersList.length} 
            isDarkMode={isDarkMode} 
          />
        </div>
      </div>
    </div>
  );
};

export default PopularBrands;