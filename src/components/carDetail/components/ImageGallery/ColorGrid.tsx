// components/ImageGallery/ColorGrid.tsx
import { buildImageUrl } from '../../../../utils/imageUrlBuilder';
import { type ColorImage } from '../../../../hooks/cars/useCarDetails';

/* ---------- Types ---------- */
type ColorTab = 'exterior' | 'interior';

interface Color {
  name: string;
}

interface ColorGalleryItem {
  color: Color;
  images: ColorImage[];
}

interface CarColorData {
  available_exterior_colors: Color[];
  available_interior_colors: Color[];
  color_gallery: {
    exterior_colors: ColorGalleryItem[];
    interior_colors: ColorGalleryItem[];
  };
}

interface ColorGridProps {
  car: CarColorData;
  isDarkMode: boolean;
  activeTab: ColorTab;
  selectedExteriorColor: string | null;
  selectedInteriorColor: string | null;
  onExteriorSelect: (color: string) => void;
  onInteriorSelect: (color: string) => void;
  onImageSelect: (url: string, type: ColorTab) => void;
}

/* ---------- Component ---------- */
const ColorGrid: React.FC<ColorGridProps> = ({
  car,
  isDarkMode,
  activeTab,
  selectedExteriorColor,
  selectedInteriorColor,
  onExteriorSelect,
  onInteriorSelect,
  onImageSelect,
}) => {
  const colors =
    activeTab === 'exterior'
      ? car.available_exterior_colors
      : car.available_interior_colors;

  const gallery =
    activeTab === 'exterior'
      ? car.color_gallery.exterior_colors
      : car.color_gallery.interior_colors;

  const isSelectedColor = (colorName: string) => {
    return activeTab === 'exterior'
      ? selectedExteriorColor === colorName
      : selectedInteriorColor === colorName;
  };

  const getSelectedBgColor = () => {
    return activeTab === 'exterior' ? 'bg-blue-600' : 'bg-green-600';
  };

  const getRingColor = () => {
    return activeTab === 'exterior' ? 'ring-blue-500' : 'ring-green-500';
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {colors.map((color) => {
        const galleryItem = gallery.find((g) => g.color.name === color.name);
        const firstImage = galleryItem?.images[0];
        const isSelected = isSelectedColor(color.name);
        const selectedBgColor = getSelectedBgColor();
        const ringColor = getRingColor();

        return (
          <button
            key={color.name}
            onClick={() => {
              activeTab === 'exterior'
                ? onExteriorSelect(color.name)
                : onInteriorSelect(color.name);

              if (firstImage) {
                onImageSelect(firstImage.image_url, activeTab);
              }
            }}
            className={`group relative aspect-square rounded-xl overflow-hidden ${
              isSelected ? `ring-2 ${ringColor}` : ''
            }`}
          >
            {firstImage ? (
              <img
                src={buildImageUrl(firstImage.image_url)}
                alt={`${color.name} ${activeTab}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  No Image
                </span>
              </div>
            )}
            
            <div className={`absolute inset-x-0 bottom-0 p-2 text-center text-xs font-medium ${
              isSelected ? `${selectedBgColor} text-white` : 'bg-black/70 text-white'
            }`}>
              {color.name}
            </div>
            
            {isSelected && (
              <div className="absolute top-2 right-2">
                <div className={`w-5 h-5 rounded-full ${selectedBgColor} flex items-center justify-center`}>
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ColorGrid;