// components/featured-cars/CarsGrid.tsx
import React from 'react';
import { type FeaturedCar } from './types';
import CarCard from './CarCard';

interface CarsGridProps {
  cars: FeaturedCar[];
  isDarkMode: boolean;
}

const CarsGrid: React.FC<CarsGridProps> = ({ cars, isDarkMode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cars.slice(0, 4).map((car) => (
        <CarCard key={car.id} car={car} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
};

export default CarsGrid;