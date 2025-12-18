// components/about/sections/BusinessHours.tsx
import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { type AboutUsData } from '../types/about';

interface BusinessHoursProps {
  data: AboutUsData;
  isDarkMode: boolean;
  showMap: boolean;
  onToggleMap: () => void;
}

const BusinessHours: React.FC<BusinessHoursProps> = ({
  data,
  isDarkMode,
  showMap,
  onToggleMap
}) => {
  const defaultHours = [
    { day: 'Monday - Friday', open_time: '8:00 AM', close_time: '6:00 PM', is_open: true },
    { day: 'Saturday', open_time: '9:00 AM', close_time: '5:00 PM', is_open: true },
    { day: 'Sunday', open_time: 'Closed', close_time: '', is_open: false }
  ];

  const hoursToDisplay = data.business_hours?.length > 0 
    ? data.business_hours 
    : defaultHours;

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Clock className="mr-3" size={24} />
        Business Hours
      </h2>
      
      <div className={`p-6 rounded-xl space-y-4 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        {hoursToDisplay.map((hour, index) => (
          <BusinessHourItem
            key={index}
            day={hour.day}
            isOpen={hour.is_open}
            openTime={hour.open_time}
            closeTime={hour.close_time}
            isDarkMode={isDarkMode}
          />
        ))}
        
        {/* Map Toggle Button */}
        <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
          <button
            onClick={onToggleMap}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            } shadow-md hover:shadow-lg`}
          >
            <MapPin size={20} className="mr-3" />
            {showMap ? 'Hide Interactive Map' : 'Show Interactive Map'}
          </button>
        </div>
      </div>
    </>
  );
};

const BusinessHourItem: React.FC<{
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  isDarkMode: boolean;
}> = ({ day, isOpen, openTime, closeTime, isDarkMode }) => {
  return (
    <div 
      className={`flex justify-between items-center p-3 rounded-lg ${
        isOpen 
          ? isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100' 
          : isDarkMode ? 'bg-gray-700/30 opacity-60' : 'bg-gray-100/50 opacity-70'
      }`}
    >
      <span className="font-medium">{day}</span>
      {isOpen ? (
        <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
          {openTime} - {closeTime}
        </span>
      ) : (
        <span className={isDarkMode ? 'text-red-400' : 'text-red-600'}>Closed</span>
      )}
    </div>
  );
};

export default BusinessHours;