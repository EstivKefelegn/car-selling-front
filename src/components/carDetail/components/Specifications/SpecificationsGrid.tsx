import React from 'react';
import SpecCard from './SpecCard';
import type { CarDetail } from '../../../../hooks/cars/useCarDetails';
import { useTranslation } from 'react-i18next';

interface SpecificationsGridProps {
  car: CarDetail;
  isDarkMode: boolean;
}

const SpecificationsGrid: React.FC<SpecificationsGridProps> = ({
  car,
  isDarkMode,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3
        className={`text-xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {t('specifications.title')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SpecCard title={t('specifications.performance')} isDarkMode={isDarkMode}>
          <p>{t('specifications.range', { distance: car.range_wltp })}</p>
          <p>{t('specifications.acceleration', { time: car.acceleration_0_100 })}</p>
        </SpecCard>

        <SpecCard title={t('specifications.battery')} isDarkMode={isDarkMode}>
          <p>{t('specifications.capacity', { capacity: car.battery_capacity })}</p>
          <p>{t('specifications.power', { power: car.motor_power })}</p>
        </SpecCard>

        <SpecCard title={t('specifications.charging')} isDarkMode={isDarkMode}>
          <p>{t('specifications.dcCharging', { power: car.max_dc_charging })}</p>
          <p>{t('specifications.chargingTime', { time: car.charging_time_10_80 })}</p>
        </SpecCard>
      </div>
    </div>
  );
};

export default SpecificationsGrid;