// pages/about/components/ContentSection.tsx
import React from 'react';
import AboutSection from '../AboutSection';
import ContactSection from '../ContactSection';
import { type AboutUsData } from '../types/about';

interface ContentSectionProps {
  activeTab: 'about' | 'contact';
  about: AboutUsData;
  isDarkMode: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  activeTab,
  about,
  isDarkMode
}) => {
  return (
    <div className="container relative mx-auto px-4 py-16 md:py-24">
      <div className={`rounded-xl p-6 md:p-8 ${
        isDarkMode 
          ? 'bg-gray-800/30 border border-gray-700' 
          : 'bg-white border border-gray-200'
      }`}>
        {activeTab === 'about' && <AboutSection data={about} isDarkMode={isDarkMode} />}
        {activeTab === 'contact' && <ContactSection data={about} isDarkMode={isDarkMode} />}
      </div>
    </div>
  );
};

export default ContentSection;