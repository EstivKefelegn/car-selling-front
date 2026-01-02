// components/ImageGallery/MainImage.tsx
import { buildImageUrl } from '../../../../utils/imageUrlBuilder';

const MainImage = ({
  // car,
  isDarkMode,
  selectedImage,
  selectedImageType,
  selectedExteriorColor,
  selectedInteriorColor,
}: any) => (
  <div className="relative rounded-2xl overflow-hidden">
    <div className="aspect-[4/3]">
      {selectedImage ? (
        <img
          src={buildImageUrl(selectedImage)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
          }`}
        >
          No image available
        </div>
      )}

      {/* Image Type Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 rounded-full bg-black/70 text-white text-sm">
          {selectedImageType === 'main'
            ? 'Main View'
            : selectedImageType === 'exterior'
            ? 'Exterior'
            : 'Interior'}
        </span>
      </div>

      {/* Color Name */}
      <div className="absolute bottom-4 left-4 px-4 py-2 rounded bg-black/70 text-white">
        {selectedImageType === 'exterior'
          ? selectedExteriorColor
          : selectedImageType === 'interior'
          ? selectedInteriorColor
          : 'Standard View'}
      </div>
    </div>
  </div>
);

export default MainImage;
