import React from 'react';

interface ImageSectionProps {
  car: any;
  apiBaseUrl: string;
  isDarkMode: boolean;
  formattedPrice?: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({ 
  car, 
  apiBaseUrl, 
  isDarkMode,
  // formattedPrice 
}) => {
  return (
    <div className="relative h-72 overflow-hidden">
      {car.main_image_url ? (
        <>
          <img 
            src={`${apiBaseUrl}${car.main_image_url}`} 
            alt={`${car.manufacturer_name} ${car.model_name}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-800/40 to-transparent"></div>
          
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-gray-300 font-bold px-3 py-1 rounded-full text-sm">
            {car.model_year}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </>
      ) : (
        <div className={`w-full h-full flex items-center justify-center ${
          isDarkMode ? 'bg-gray-700/50' : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }`}>
          <svg className="w-20 h-20 text-gray-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ImageSection;