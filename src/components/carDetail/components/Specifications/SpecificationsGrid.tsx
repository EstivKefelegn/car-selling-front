import SpecCard from './SpecCard';
import type { CarDetail } from '../../../../hooks/cars/useCarDetails';

interface SpecificationsGridProps {
  car: CarDetail;
  isDarkMode: boolean;
}

const SpecificationsGrid: React.FC<SpecificationsGridProps> = ({
  car,
  isDarkMode,
}) => (
  <div>
    <h3
      className={`text-xl font-bold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      Key Specifications
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SpecCard title="Performance" isDarkMode={isDarkMode}>
        <p>{car.range_wltp} km range</p>
        <p>{car.acceleration_0_100} 0–100</p>
      </SpecCard>

      <SpecCard title="Battery" isDarkMode={isDarkMode}>
        <p>{car.battery_capacity} kWh</p>
        <p>{car.motor_power} HP</p>
      </SpecCard>

      <SpecCard title="Charging" isDarkMode={isDarkMode}>
        <p>{car.max_dc_charging} kW DC</p>
        <p>{car.charging_time_10_80} min</p>
      </SpecCard>
    </div>
  </div>
);

export default SpecificationsGrid;
