// components/shop-by-manufacturer/ManufacturerCount.tsx
import React from 'react';

interface ManufacturerCountProps {
  count: number;
  isDarkMode: boolean;
}

const ManufacturerCount: React.FC<ManufacturerCountProps> = ({ count, isDarkMode }) => {
  return (
    <div className={`text-center mt-6 text-sm ${
      isDarkMode ? 'text-gray-400' : 'text-gray-500'
    }`}>
      {count} manufacturers available
    </div>
  );
};

export default ManufacturerCount;