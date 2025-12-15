// components/Footer/Footer.tsx
import React from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import Newsletter from './NewsLetter';
import BrandSection from './BrandSection';
import LinksSection from './LinkSection';
import ContactSection from './ContactSection';
import Copyright from './Copyright';

const Footer: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();

  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
      <Newsletter  />
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BrandSection isDarkMode={isDarkMode} />
            <LinksSection isDarkMode={isDarkMode} />
            <ContactSection isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
      
      <Copyright isDarkMode={isDarkMode} />
    </footer>
  );
};

export default Footer;