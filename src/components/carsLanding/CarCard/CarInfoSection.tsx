import React from 'react';

interface CarInfoSectionProps {
  car: any;
  isDarkMode: boolean;
  formattedPrice: string;
  carPrice: number | null;
}

const CarInfoSection: React.FC<CarInfoSectionProps> = ({
  car,
  isDarkMode,
  formattedPrice,
  carPrice
}) => {
  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white'}`}>
      <div className="flex items-center mb-4">
        {car.manufacturer_logo && (
          <div className="mr-3 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <img 
              src={car.manufacturer_logo}
              alt={car.manufacturer_name}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        <div>
          <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {car.manufacturer_name} <span className="text-gray-700 dark:text-gray-400">{car.model_name}</span>
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {car.variant} • {car.category_display}
          </p>
        </div>
      </div>
      
      <StatsGrid car={car} isDarkMode={isDarkMode} />
      <EfficiencySection car={car} isDarkMode={isDarkMode} />
      <PriceAndCTA 
        car={car}
        isDarkMode={isDarkMode}
        formattedPrice={formattedPrice}
        carPrice={carPrice}
      />
    </div>
  );
};

const StatsGrid = ({ car, isDarkMode }: any) => (
  <div className="grid grid-cols-3 gap-3 mb-6">
    <StatBox 
      label="RANGE"
      value={car.range_wltp}
      unit="km"
      isDarkMode={isDarkMode}
    />
    <StatBox 
      label="POWER"
      value={car.motor_power}
      unit="HP"
      isDarkMode={isDarkMode}
    />
    <StatBox 
      label="0-100"
      value={car.acceleration_0_100}
      unit="s"
      isDarkMode={isDarkMode}
    />
  </div>
);

const StatBox = ({ label, value, unit, isDarkMode }: any) => (
  <div className={`text-center p-3 rounded-xl border ${
    isDarkMode 
      ? 'bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-gray-700' 
      : 'bg-gradient-to-b from-gray-800/5 to-gray-900/5 border-gray-300'
  }`}>
    <p className={`text-xs font-medium mb-1 ${
      isDarkMode ? 'text-gray-300' : 'text-gray-800'
    }`}>
      {label}
    </p>
    <p className={`text-xl font-bold ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {value}<span className="text-sm">{unit}</span>
    </p>
  </div>
);

const EfficiencySection = ({ car, isDarkMode }: any) => (
  <div className={`mb-6 p-4 rounded-xl border ${
    isDarkMode 
      ? 'bg-gradient-to-r from-gray-800/40 to-gray-900/40 border-gray-700' 
      : 'bg-gradient-to-r from-gray-800/5 to-gray-900/5 border-gray-300'
  }`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-800'
        }`}>
          Efficiency
        </p>
        <p className={`text-xs ${
          isDarkMode ? 'text-gray-400/80' : 'text-gray-600/80'
        }`}>
          WLTP Combined
        </p>
      </div>
      <p className={`text-xl font-bold ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {car.efficiency} <span className="text-sm">km/kWh</span>
      </p>
    </div>
    <div className={`mt-2 h-2 rounded-full overflow-hidden ${
      isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
    }`}>
      <div 
        className="h-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-full"
        style={{ width: `${Math.min(car.efficiency * 10, 100)}%` }}
      ></div>
    </div>
  </div>
);

const PriceAndCTA = ({ car, isDarkMode, formattedPrice }: any) => (
  <div className={`pt-6 border-t ${
    isDarkMode ? 'border-gray-700' : 'border-gray-200'
  }`}>
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Starting from
        </p>
        <p className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {car.base_price || formattedPrice}
        </p>
      </div>
      <div className="text-right">
        <p className={`text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {car.total_configurations} configuration
          {car.total_configurations !== 1 ? 's' : ''}
        </p>
        <p className={`text-xs font-medium ${
          isDarkMode ? 'text-green-400' : 'text-green-600'
        }`}>
          {car.status_display}
        </p>
      </div>
    </div>
    
    <div className="flex gap-3">
      <button className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:scale-105
        bg-gradient-to-r from-gray-800 to-gray-900 text-white group relative`}>
        <div className="relative z-10">View Details</div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>
      <button className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 border
        ${isDarkMode 
          ? 'border-gray-700 text-gray-300 hover:bg-gray-800 active:bg-gray-900' 
          : 'border-gray-800 text-gray-800 hover:bg-gray-50 active:bg-gray-100'
        }`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  </div>
);

export default CarInfoSection;