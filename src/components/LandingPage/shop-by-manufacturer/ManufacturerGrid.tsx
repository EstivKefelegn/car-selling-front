// components/shop-by-manufacturer/ManufacturersGrid.tsx
import React, { useRef } from 'react';
import { type Manufacturer } from '../../../hooks/manufacturer/useManufacturers';
import ManufacturerCard from './ManufacturerCard';
import ScrollControls from './ScrollControls';
import GradientOverlays from './GradientOverlays';

interface ManufacturersGridProps {
  manufacturers: Manufacturer[];
  manufacturerCarImages: Record<string, string>;
  isDarkMode: boolean;
  buildImageUrl: (imagePath: string) => string;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

const ManufacturersGrid: React.FC<ManufacturersGridProps> = ({
  manufacturers,
  manufacturerCarImages,
  isDarkMode,
  buildImageUrl,
  onScrollLeft,
  onScrollRight
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative group">
      <ScrollControls
        onScrollLeft={onScrollLeft}
        onScrollRight={onScrollRight}
        isDarkMode={isDarkMode}
      />

      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide px-4"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {manufacturers.map((manufacturer) => {
          const carImage = manufacturerCarImages[manufacturer.name];
          
          return (
            <ManufacturerCard
              key={manufacturer.id}
              manufacturer={manufacturer}
              carImage={carImage}
              isDarkMode={isDarkMode}
              buildImageUrl={buildImageUrl}
            />
          );
        })}
      </div>

      <GradientOverlays isDarkMode={isDarkMode} />
    </div>
  );
};

export default ManufacturersGrid;