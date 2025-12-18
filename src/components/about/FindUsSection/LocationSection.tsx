// components/about/sections/LocationSection.tsx
import React from 'react';
import { MapPin, Navigation, Globe, Car } from 'lucide-react';
import { type AboutUsData } from '../types/about';
import MapComponent from '../MapComponent';

interface LocationSectionProps {
  data: AboutUsData;
  isDarkMode: boolean;
  showMap: boolean;
  onToggleMap: () => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  data,
  isDarkMode,
  showMap,
  onToggleMap
}) => {
  const handleViewOnMaps = () => {
    if (data.coordinates?.latitude && data.coordinates?.longitude) {
      window.open(
        `https://www.google.com/maps?q=${data.coordinates.latitude},${data.coordinates.longitude}`,
        '_blank'
      );
    }
  };

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: userLat, longitude: userLng } = position.coords;
        window.open(
          `https://www.google.com/maps/dir/${userLat},${userLng}/${data.coordinates.latitude},${data.coordinates.longitude}`,
          '_blank'
        );
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <MapPin className="mr-3" size={24} />
          Our Location
        </h2>
        <button
          onClick={onToggleMap}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Navigation size={18} className="mr-2" />
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>
      
      <div className={`p-6 rounded-xl mb-6 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <p className="text-lg mb-4">{data.full_address || data.address}</p>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleViewOnMaps}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            <Globe size={18} className="mr-2" />
            View on Google Maps
          </button>
          
          <button
            onClick={handleGetDirections}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'border border-gray-600 hover:bg-gray-700 text-gray-300' 
                : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Car size={18} className="mr-2" />
            Get Directions
          </button>
        </div>
      </div>

      {/* Map Display */}
      {showMap && data.coordinates && (
        <div className="mb-8">
          <MapComponent
            latitude={data.coordinates.latitude}
            longitude={data.coordinates.longitude}
            address={data.full_address || data.address}
            dealershipName={data.dealership_name}
            className="h-80 w-full rounded-xl shadow-lg"
            id="contact-section"
          />
        </div>
      )}
    </div>
  );
};

export default LocationSection;