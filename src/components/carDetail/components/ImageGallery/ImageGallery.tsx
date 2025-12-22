// components/ImageGallery/ImageGallery.tsx
import MainImage from './MainImage';
import ColorTabs from './ColorTabs';
import ColorGrid from './ColorGrid';
import ThumbnailGallery from './ThumbnailGallery';
import { type ColorImage } from '../../../../hooks/cars/useCarDetails';
import { useTranslation } from 'react-i18next';

interface Props {
  car: any;
  isDarkMode: boolean;

  selectedImage: string;
  selectedImageType: 'main' | 'exterior' | 'interior';
  activeColorTab: 'exterior' | 'interior';

  selectedExteriorColor: string | null;
  selectedInteriorColor: string | null;

  onImageChange: (url: string) => void;
  onImageTypeChange: (type: 'main' | 'exterior' | 'interior') => void;
  onExteriorColorChange: (color: string) => void;
  onInteriorColorChange: (color: string) => void;
  onTabChange: (tab: 'exterior' | 'interior') => void;
}

const ImageGallery: React.FC<Props> = ({
  car,
  isDarkMode,
  selectedImage,
  selectedImageType,
  activeColorTab,
  selectedExteriorColor,
  selectedInteriorColor,
  onImageChange,
  onImageTypeChange,
  onExteriorColorChange,
  onInteriorColorChange,
  onTabChange,
}) => {
  const { t } = useTranslation();

  const getImages = (type: 'exterior' | 'interior'): ColorImage[] => {
    const selectedColor =
      type === 'exterior' ? selectedExteriorColor : selectedInteriorColor;

    if (!selectedColor) return [];

    const gallery =
      type === 'exterior'
        ? car.color_gallery.exterior_colors
        : car.color_gallery.interior_colors;

    return (
      gallery.find((g: any) => g.color.name === selectedColor)?.images || []
    );
  };

  const exteriorImages = getImages('exterior');
  const interiorImages = getImages('interior');

  // Get current active images based on tab
  const activeImages = activeColorTab === 'exterior' ? exteriorImages : interiorImages;

  return (
    <div className="space-y-6">
      <MainImage
        car={car}
        isDarkMode={isDarkMode}
        selectedImage={selectedImage}
        selectedImageType={selectedImageType}
        selectedExteriorColor={selectedExteriorColor}
        selectedInteriorColor={selectedInteriorColor}
      />

      {(car.available_exterior_colors.length > 0 || car.available_interior_colors.length > 0) && (
        <div className={`rounded-2xl p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <ColorTabs
            isDarkMode={isDarkMode}
            hasExterior={car.available_exterior_colors.length > 0}
            hasInterior={car.available_interior_colors.length > 0}
            activeTab={activeColorTab}
            onTabChange={onTabChange}
          />

          <ColorGrid
            car={car}
            isDarkMode={isDarkMode}
            activeTab={activeColorTab}
            selectedExteriorColor={selectedExteriorColor}
            selectedInteriorColor={selectedInteriorColor}
            onExteriorSelect={onExteriorColorChange}
            onInteriorSelect={onInteriorColorChange}
            onImageSelect={(url, type) => {
              onImageChange(url);
              onImageTypeChange(type);
            }}
          />
        </div>
      )}

      {/* Only show thumbnail gallery if there are images for the active tab */}
      {activeImages.length > 0 && (
        <ThumbnailGallery
          images={activeImages}
          activeType={activeColorTab}
          selectedImage={selectedImage}
          onSelect={(url) => {
            onImageChange(url);
            onImageTypeChange(activeColorTab);
          }}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default ImageGallery;