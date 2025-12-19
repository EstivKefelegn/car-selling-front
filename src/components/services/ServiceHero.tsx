// components/ServiceHero.tsx
import React, { useState } from 'react';
import ServiceBookingModal from './ServiceBooking/ServiceBookingModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Service Hero Section */}
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
            {/* Book Service Button with your style */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative px-8 py-4 rounded-xl transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:scale-105"
            >
              <div className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-semibold text-lg">Book Service Now</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <button className={`px-8 py-4 rounded-lg font-semibold transition-colors border-2 ${
              isDarkMode
                ? 'border-gray-500 text-white hover:bg-blue-900/30'
                : 'border-gray-600 text-gray-900 hover:bg-blue-50'
            }`}>
              View Service Plans
            </button>
          </div>
        </div>
      </div>

      {/* Transparent Popup Modal */}
      <ServiceBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default ServiceHero;