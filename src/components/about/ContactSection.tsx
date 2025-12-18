// components/about/sections/ContactSection.tsx
import React, { useState, useEffect } from 'react';
import { type AboutUsData } from './types/about';
import LocationSection from './FindUsSection/LocationSection';
import ContactDetails from './FindUsSection/ContactDetails';
import SocialMedia from './FindUsSection/SocialMedia';
import BusinessHours from './FindUsSection/BusinesHours';
import MapPreview from './FindUsSection/MapPreview';

interface ContactSectionProps {
  data: AboutUsData;
  isDarkMode: boolean; 
}

const ContactSection: React.FC<ContactSectionProps> = ({ data, isDarkMode }) => {
  const [showMap, setShowMap] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <LocationSection
            data={data}
            isDarkMode={isDarkMode}
            showMap={showMap}
            onToggleMap={() => setShowMap(!showMap)}
          />
          
          <ContactDetails data={data} isDarkMode={isDarkMode} />
          
          <SocialMedia data={data} isDarkMode={isDarkMode} />
        </div>

        {/* Right Column */}
        <div>
          <BusinessHours
            data={data}
            isDarkMode={isDarkMode}
            showMap={showMap}
            onToggleMap={() => setShowMap(!showMap)}
          />
          
          {!showMap && isClient && data.coordinates && (
            <MapPreview
              data={data}
              isDarkMode={isDarkMode}
              onShowMap={() => setShowMap(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;