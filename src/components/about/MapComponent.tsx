// components/about/MapComponent.tsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  latitude: number;
  longitude: number;
  address?: string;
  dealershipName?: string;
  zoom?: number;
  className?: string;
  id?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  address,
  dealershipName,
  zoom = 15,
  className = 'h-96 w-full rounded-lg',
  id,
}) => {
  // Set default zoom if coordinates are 0,0 (invalid)
  const isValidLocation = latitude !== 0 && longitude !== 0;
  
  if (!isValidLocation) {
    return (
      <div className={`flex items-center justify-center ${className} ${
        className.includes('bg-') ? '' : 'bg-gray-100 dark:bg-gray-800'
      }`}>
        <div className="text-center p-8">
          <div className="text-4xl mb-4">📍</div>
          <p className="text-gray-600 dark:text-gray-400">Location data not available</p>
        </div>
      </div>
    );
  }

  const position: [number, number] = [latitude, longitude];

  return (
    <div id={id} className={className}>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full rounded-lg z-0"
        style={{ minHeight: '300px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          {address && dealershipName && (
            <Popup>
              <div className="p-2">
                <strong className="text-gray-900">{dealershipName}</strong>
                <p className="text-gray-600 text-sm mt-1">{address}</p>
              </div>
            </Popup>
          )}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;