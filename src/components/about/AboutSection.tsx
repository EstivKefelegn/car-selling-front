// components/about/sections/AboutSection.tsx
import React from 'react';
import { type AboutUsData } from './types/about';
import MissionVisionSection from './StorySection/MissionVision';
import CoreValuesSection from './StorySection/CoreValuesSection';
import HistorySection from './StorySection/HistorySection';
import ServicesBrandsSection from './StorySection/ServiceBrandsSection';

interface AboutSectionProps {
  data: AboutUsData;
  isDarkMode: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data, isDarkMode }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <MissionVisionSection 
        mission={data.mission_statement} 
        vision={data.vision_statement} 
        isDarkMode={isDarkMode} 
      />
      
      <CoreValuesSection 
        coreValues={data.core_values} 
        isDarkMode={isDarkMode} 
      />
      
      <HistorySection 
        history={data.history} 
        isDarkMode={isDarkMode} 
      />
      
      <ServicesBrandsSection 
        services={data.services_offered} 
        brands={data.brands_carried} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
};

export default AboutSection;