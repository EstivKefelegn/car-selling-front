// components/about/sections/MapPreview.tsx
import React from 'react';
import { type AboutUsData } from '../types/about';
import MapComponent from '../MapComponent';

interface MapPreviewProps {
  data: AboutUsData;
  isDarkMode: boolean;
  onShowMap: () => void;
}

const MapPreview: React.FC<MapPreviewProps> = ({ data, isDarkMode, onShowMap }) => {
  if (!data.coordinates) return null;

  return (
    <div className="mt-8">
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <h3 className="text-lg font-bold mb-4">Find Us Easily</h3>
        <div className="h-48 w-full rounded-lg overflow-hidden">
          <MapComponent
            latitude={data.coordinates.latitude}
            longitude={data.coordinates.longitude}
            zoom={14}
            className="h-full w-full"
          />
        </div>
        <button
          onClick={onShowMap}
          className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'border border-gray-600 hover:bg-gray-700 text-gray-300' 
              : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
          }`}
        >
          Open Full Screen Map
        </button>
      </div>
    </div>
  );
};

export default MapPreview;