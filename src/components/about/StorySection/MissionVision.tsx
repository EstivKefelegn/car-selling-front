// components/about/sections/MissionVisionSection.tsx
import React from 'react';
import { Target, Award } from 'lucide-react';
import InfoCard from '../InfoCard';

interface MissionVisionSectionProps {
  mission?: string;
  vision?: string;
  isDarkMode: boolean;
}

const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({
  mission,
  vision,
  isDarkMode
}) => {
  if (!mission && !vision) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {mission && (
        <InfoCard
          title="Our Mission"
          content={mission}
          icon={<Target className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />}
          isDarkMode={isDarkMode}
        />
      )}
      
      {vision && (
        <InfoCard
          title="Our Vision"
          content={vision}
          icon={<Award className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default MissionVisionSection;