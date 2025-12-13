// components/shop-by-manufacturer/ManufacturerCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { type Manufacturer } from '../../../hooks/useManufacturers';

interface ManufacturerCardProps {
  manufacturer: Manufacturer;
  carImage: string | null;
  isDarkMode: boolean;
  buildImageUrl: (imagePath: string) => string;
}

const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
  manufacturer,
  carImage,
  isDarkMode,
  buildImageUrl
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, manufacturerName: string) => {
    const target = e.target as HTMLImageElement;
    console.error(`Failed to load image for ${manufacturerName}:`, carImage);
    target.style.display = 'none';
    
    // Show fallback
    const parent = target.parentElement;
    if (parent) {
      const fallback = document.createElement('div');
      fallback.className = `w-full h-full flex items-center justify-center ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`;
      fallback.innerHTML = `<span class="text-lg font-medium ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }">${manufacturerName}</span>`;
      parent.appendChild(fallback);
    }
  };

  const handleImageLoad = (manufacturerName: string) => {
    console.log(`Successfully loaded image for ${manufacturerName}:`, carImage);
  };

  return (
    <div className="flex-shrink-0 w-48">
      <Link
        to={`/all-cars?manufacturer=${encodeURIComponent(manufacturer.name)}`}
        className={`group block rounded-xl overflow-hidden transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-gray-800/40 to-gray-900/40' 
            : 'bg-gradient-to-b from-white to-gray-50'
        } hover:scale-105 hover:shadow-xl border ${
          isDarkMode ? 'border-gray-700/50' : 'border-gray-200'
        }`}
      >
        {/* Car Image Container */}
        <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {carImage ? (
            <>
              <img
                src={buildImageUrl(carImage)}
                alt={`Latest ${manufacturer.name} car`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => handleImageError(e, manufacturer.name)}
                onLoad={() => handleImageLoad(manufacturer.name)}
              />
              {/* Image loading overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <span className={`text-lg font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {manufacturer.name}
              </span>
            </div>
          )}
          
          {/* EV Badge */}
          {manufacturer.is_ev_only && (
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
                isDarkMode 
                  ? 'bg-green-900/80 text-green-200' 
                  : 'bg-green-100 text-green-800'
              }`}>
                <span>⚡</span>
              </span>
            </div>
          )}
        </div>

        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
        -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </Link>

      {/* Manufacturer Name - Centered below card */}
      <div className="mt-3 text-center">
        <h3 className={`text-lg font-semibold truncate ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {manufacturer.name}
        </h3>
      </div>
    </div>
  );
};

export default ManufacturerCard;