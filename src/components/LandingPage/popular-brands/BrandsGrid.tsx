// components/popular-brands/BrandsGrid.tsx
import React from 'react';
import type { Manufacturer } from '../../../hooks/manufacturer/useManufacturers';
import BrandCard from './BrandCard';

interface BrandsGridProps {
  brands: Manufacturer[];
  selectedBrand: string | null;
  isDarkMode: boolean;
  onBrandClick: (brandName: string) => void;
}

const BrandsGrid: React.FC<BrandsGridProps> = ({
  brands,
  selectedBrand,
  isDarkMode,
  onBrandClick
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          isSelected={selectedBrand === brand.name}
          isDarkMode={isDarkMode}
          onClick={onBrandClick}
        />
      ))}
    </div>
  );
};

export default BrandsGrid;