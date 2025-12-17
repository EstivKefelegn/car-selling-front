// components/ServiceHero.tsx
import React from 'react';
import FindCarsButton from '../../utils/FindCars';

interface ServiceHeroProps {
  title: string;
  description: string;
  isDarkMode: boolean;
  backgroundImage?: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  description,
  isDarkMode,
  backgroundImage
}) => {
  return (
    <div 
      className={`relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage} 
            alt="EV Service Background" 
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gray-900/70' 
              : 'bg-white/80'
          }`} />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className={`inline-block px-6 py-3 rounded-full mb-6 ${
          isDarkMode 
            ? 'bg-blue-900/30 text-blue-300' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          <span className="font-medium">NETA Certified Services</span>
        </div>
        
        <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h1>
        
        <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <button className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}>
            Book Service Now
          </button> */}
            <FindCarsButton isDark={isDarkMode} text='Book Service Now'/>
          <button className={`px-8 py-3 rounded-lg font-semibold transition-colors border-2 ${
            isDarkMode
              ? 'border-gray-500 text-white hover:bg-blue-900/30'
              : 'border-gray-600 text-gray-900 hover:bg-blue-50'
          }`}>
            View Service Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;