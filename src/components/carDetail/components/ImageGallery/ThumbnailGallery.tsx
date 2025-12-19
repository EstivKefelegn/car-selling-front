// components/ImageGallery/ThumbnailGallery.tsx
import { buildImageUrl } from '../../../../utils/imageUrlBuilder';
import { type ColorImage } from '../../../../hooks/cars/useCarDetails';

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
  return (
    <div className={`rounded-2xl p-6 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {activeType === 'exterior' ? 'Exterior' : 'Interior'} Gallery
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => onSelect(image.image_url)}
            className={`aspect-square rounded-lg overflow-hidden ${
              selectedImage === image.image_url
                ? 'ring-2 ring-blue-500'
                : ''
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