// components/manufacturers/ManufacturerGrid.tsx
import React from 'react';
import { type Manufacturer } from '../../../hooks/manufacturer/useManufacturers';
import ManufacturerCard from './ManufacturerCard';

interface ManufacturerGridProps {
  manufacturers: Manufacturer[];
  isDarkMode: boolean;
  onManufacturerClick: (manufacturer: Manufacturer) => void;
}

const ManufacturerGrid: React.FC<ManufacturerGridProps> = ({
  manufacturers,
  isDarkMode,
  onManufacturerClick
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
      {manufacturers.map((manufacturer) => (
        <ManufacturerCard
          key={manufacturer.id}
          manufacturer={manufacturer}
          isDarkMode={isDarkMode}
          onClick={onManufacturerClick}
        />
      ))}
    </div>
  );
};

export default ManufacturerGrid;