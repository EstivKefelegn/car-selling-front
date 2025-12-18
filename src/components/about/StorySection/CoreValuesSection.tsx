// components/about/sections/CoreValuesSection.tsx
import React from 'react';
import { Heart, Star } from 'lucide-react';
import InfoCard from '../InfoCard';

interface CoreValuesSectionProps {
  coreValues?: string;
  isDarkMode: boolean;
}

const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({
  coreValues,
  isDarkMode
}) => {
  if (!coreValues) {
    return null;
  }

  const values = coreValues.split('\n').filter(value => value.trim());

  return (
    <InfoCard
      title="Core Values"
      icon={<Heart className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />}
      isDarkMode={isDarkMode}
      className="p-8"
    >
      <div className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {values.map((value, index) => (
          <div key={index} className="flex items-start mb-4">
            <Star 
              size={20} 
              className={`mt-1 mr-3 flex-shrink-0 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`} 
            />
            <p>{value.trim()}</p>
          </div>
        ))}
      </div>
    </InfoCard>
  );
};

export default CoreValuesSection;