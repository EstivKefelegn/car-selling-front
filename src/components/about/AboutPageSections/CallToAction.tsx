// pages/about/components/CallToAction.tsx
import React from 'react';
import { Heart, Clock, ChevronRight } from 'lucide-react';

interface CallToActionProps {
  isDarkMode: boolean;
}

const CallToAction: React.FC<CallToActionProps> = ({ isDarkMode }) => {
  return (
    <div className="mt-20 text-center">
      <div className={`relative p-8 md:p-10 rounded-2xl ${
        isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <Heart className={`w-16 h-16 mx-auto mb-6 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`} />
        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Ready to Join the Electric Revolution?
        </h2>
        <p className={`text-lg mb-8 max-w-2xl mx-auto ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Experience the future of driving with Ethiopia's premier electric vehicle destination.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className={`px-6 md:px-8 py-3 md:py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
            isDarkMode 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}>
            <span className="flex items-center justify-center">
              Book a Test Drive
              <ChevronRight className="ml-3" size={20} />
            </span>
          </button>
          <button className={`px-6 md:px-8 py-3 md:py-4 font-semibold rounded-xl border transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50' 
              : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100'
          }`}>
            <span className="flex items-center justify-center">
              <Clock className="mr-3" size={20} />
              View Inventory
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;