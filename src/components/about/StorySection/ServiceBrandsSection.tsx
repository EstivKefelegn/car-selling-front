// components/about/sections/ServicesBrandsSection.tsx
import React from 'react';
import { Wrench, Car } from 'lucide-react';
import InfoCard from '../InfoCard';

interface ServicesBrandsSectionProps {
  services?: string;
  brands?: string;
  isDarkMode: boolean;
}

const ServicesBrandsSection: React.FC<ServicesBrandsSectionProps> = ({
  services,
  brands,
  isDarkMode
}) => {
  const renderListItems = (text?: string) => {
    if (!text) return null;
    
    return text.split('\n')
      .filter(item => item.trim())
      .map((item, index) => (
        <p key={index} className="mb-2">• {item.trim()}</p>
      ));
  };

  if (!services && !brands) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {services && (
        <InfoCard
          title="Services Offered"
          icon={<Wrench className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />}
          isDarkMode={isDarkMode}
        >
          <div className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {renderListItems(services)}
          </div>
        </InfoCard>
      )}
      
      {brands && (
        <InfoCard
          title="Brands We Carry"
          icon={<Car className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />}
          isDarkMode={isDarkMode}
        >
          <div className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {renderListItems(brands)}
          </div>
        </InfoCard>
      )}
    </div>
  );
};

export default ServicesBrandsSection;