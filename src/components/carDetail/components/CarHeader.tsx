import React from 'react';
import { useDarkModeStore } from '../../../store/useDarkModeStore';
import { formatPrice } from '../../../utils/priceFormatter';

interface CarHeaderProps {
  car: any;
}

const CarHeader: React.FC<CarHeaderProps> = ({ car }) => {
  const { isDarkMode } = useDarkModeStore();

  return (
    <div className="flex justify-between flex-wrap gap-4">
      <div>
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {car.manufacturer_details.name} {car.model_name} {car.variant}
        </h1>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          {car.model_year} • {car.category_display}
        </p>
      </div>

      <div className="text-right">
        <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {formatPrice(car.base_price)}
        </div>
        {car.tax_incentive && (
          <span className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            Tax Incentive Eligible
          </span>
        )}
      </div>
    </div>
  );
};

export default CarHeader;