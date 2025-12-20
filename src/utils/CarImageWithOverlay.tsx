// components/CarImageWithOverlay.tsx
import React, { useState } from 'react';
import apiClient from '../services/api-client';

interface CarImageWithOverlayProps {
  imageUrl: string;
  alt: string;
  isFeatured?: boolean;
  className?: string;
}

const CarImageWithOverlay: React.FC<CarImageWithOverlayProps> = ({
  imageUrl,
  alt,
  isFeatured = false,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Construct full URL
  const fullImageUrl = imageUrl.startsWith('/') 
    ? `${apiClient}${imageUrl}`
    : imageUrl;

  return (
    <div className={`relative h-64 overflow-hidden ${className}`}>
      {!imageError ? (
        <>
          <img 
            src={fullImageUrl}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
            onLoad={() => console.log('Image loaded successfully:', alt)}
          />
          
          {/* Blue tint overlay */}
          <div className="absolute inset-0 bg-blue-600/30 mix-blend-overlay"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-blue-600/20 to-transparent"></div>
          
          {/* Featured badge */}
          {isFeatured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center">
          <div className="text-blue-400 mb-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Car Image</p>
          <p className="text-gray-400 text-xs mt-1">{alt}</p>
        </div>
      )}
    </div>
  );
};

export default CarImageWithOverlay;