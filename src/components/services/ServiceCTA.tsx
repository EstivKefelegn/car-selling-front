// pages/services/ServiceCTA.tsx
import React from 'react';

interface ServiceCTAProps {
  isDarkMode: boolean;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({ isDarkMode }) => {
  return (
    <div className={`rounded-2xl p-8 text-center ${
      isDarkMode 
        ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/30' 
        : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
    }`}>
      <h2 className="text-3xl font-bold mb-4">Ready to Service Your EV?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto opacity-80">
        Book your service appointment online or visit one of our service centers
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => console.log('Book online')}
          className={`group relative px-8 py-3 rounded-xl transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl ${
            isDarkMode
              ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
              : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
          } hover:scale-105 font-bold text-lg`}
        >
          <div className="relative z-10 flex items-center space-x-2">
            <span>Book Online Now</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
        
        <button 
          onClick={() => console.log('Call us')}
          className={`group relative px-8 py-3 rounded-xl transition-all duration-300 overflow-hidden border ${
            isDarkMode 
              ? 'border-blue-600 text-blue-400 hover:bg-blue-900/30' 
              : 'border-blue-500 text-blue-600 hover:bg-blue-50'
          } font-bold text-lg`}
        >
          <div className="relative z-10 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call: +251 900 123 456</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-white'
        }`}>
          <div className="text-3xl mb-2">24/7</div>
          <div className="font-semibold">Roadside Assistance</div>
        </div>
        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-white'
        }`}>
          <div className="text-3xl mb-2">2-Hour</div>
          <div className="font-semibold">Emergency Response</div>
        </div>
        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-white'
        }`}>
          <div className="text-3xl mb-2">Same-Day</div>
          <div className="font-semibold">Service Available</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCTA;