// components/about/GallerySection.tsx
import React, { useState } from 'react';
import { Image, X } from 'lucide-react';
import { type DealershipPhoto } from './types/about';

interface GallerySectionProps {
  gallery: DealershipPhoto[];
  isDarkMode: boolean;
}

const GallerySection: React.FC<GallerySectionProps> = ({ gallery, isDarkMode }) => {
  const [selectedImage, setSelectedImage] = useState<DealershipPhoto | null>(null);

  if (gallery.length === 0) {
    return (
      <div className="text-center py-12">
        <Image size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-xl text-gray-500">No photos available</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Dealership Gallery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((photo) => (
            <div 
              key={photo.id} 
              className={`rounded-xl overflow-hidden group cursor-pointer ${
                isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
              }`}
              onClick={() => setSelectedImage(photo)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={photo.photo_url} 
                  alt={photo.caption}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
              <div className="p-4">
                <p className="font-medium">{photo.caption}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {photo.photo_type.charAt(0).toUpperCase() + photo.photo_type.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage.photo_url} 
              alt={selectedImage.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
              <p className="text-gray-300 text-sm">
                {selectedImage.photo_type.charAt(0).toUpperCase() + selectedImage.photo_type.slice(1)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;