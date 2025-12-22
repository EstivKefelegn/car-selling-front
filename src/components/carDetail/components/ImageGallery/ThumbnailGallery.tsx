import React from 'react';
import { buildImageUrl } from '../../../../utils/imageUrlBuilder';
import { type ColorImage } from '../../../../hooks/cars/useCarDetails';
import { useTranslation } from 'react-i18next';

interface ThumbnailGalleryProps {
  images: ColorImage[];
  activeType: 'exterior' | 'interior';
  selectedImage: string;
  onSelect: (url: string) => void;
  isDarkMode: boolean;
}

const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({
  images,
  activeType,
  selectedImage,
  onSelect,
  isDarkMode
}) => {
  const { t } = useTranslation();

  const getGalleryTitle = () => {
    if (activeType === 'exterior') {
      return t('thumbnailGallery.exteriorGallery');
    } else {
      return t('thumbnailGallery.interiorGallery');
    }
  };

  return (
    <div className={`rounded-2xl p-6 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {getGalleryTitle()}
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => onSelect(image.image_url)}
            className={`aspect-square rounded-lg overflow-hidden transition-all ${
              selectedImage === image.image_url
                ? 'ring-2 ring-blue-500 transform scale-105'
                : 'hover:ring-1 hover:ring-blue-300'
            }`}
          >
            <img
              src={buildImageUrl(image.image_url)}
              alt={`${activeType} view`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailGallery;