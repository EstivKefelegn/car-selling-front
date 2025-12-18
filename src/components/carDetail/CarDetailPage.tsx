// pages/CarDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useCarDetails, { type ColorImage, type ColorGalleryItem } from '../../hooks/cars/useCarDetails';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { buildImageUrl } from '../../utils/imageUrlBuilder';
import { formatPrice } from '../../utils/priceFormatter';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorMessage from '../../utils/ErrorMessage';
import FindCarsButton from '../../utils/FindCars';

const CarDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkModeStore();
  const [selectedExteriorColor, setSelectedExteriorColor] = useState<string | null>(null);
  const [selectedInteriorColor, setSelectedInteriorColor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageType, setSelectedImageType] = useState<'main' | 'exterior' | 'interior'>('main');
  const [activeColorTab, setActiveColorTab] = useState<'exterior' | 'interior'>('exterior');
  
  const { data: car, loading, error } = useCarDetails(slug || '');

  // Initialize selected colors and images when car data loads
  useEffect(() => {
    if (car) {
      // Set default exterior color (first available)
      if (car.available_exterior_colors.length > 0) {
        setSelectedExteriorColor(car.available_exterior_colors[0].name);
      }
      
      // Set default interior color (first available)
      if (car.available_interior_colors.length > 0) {
        setSelectedInteriorColor(car.available_interior_colors[0].name);
      }
      
      // Set main image as default
      if (car.main_image_url) {
        setSelectedImage(car.main_image_url);
        setSelectedImageType('main');
      }
    }
  }, [car]);

  const handleImageClick = (imageUrl: string, imageType: 'exterior' | 'interior') => {
    setSelectedImage(imageUrl);
    setSelectedImageType(imageType);
  };

  const handleColorSelect = (colorName: string, colorType: 'exterior' | 'interior') => {
    if (colorType === 'exterior') {
      setSelectedExteriorColor(colorName);
      setActiveColorTab('exterior');
      
      // Find and set the first image for this exterior color
      const exteriorColorGallery = car?.color_gallery.exterior_colors.find(
        item => item.color.name === colorName
      );
      if (exteriorColorGallery?.images.length) {
        setSelectedImage(exteriorColorGallery.images[0].image_url);
        setSelectedImageType('exterior');
      }
    } else {
      setSelectedInteriorColor(colorName);
      setActiveColorTab('interior');
      
      // Find and set the first image for this interior color
      const interiorColorGallery = car?.color_gallery.interior_colors.find(
        item => item.color.name === colorName
      );
      if (interiorColorGallery?.images.length) {
        setSelectedImage(interiorColorGallery.images[0].image_url);
        setSelectedImageType('interior');
      }
    }
  };

  const handleBackToCars = () => {
    navigate('/cars');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* <LoadingSpinner message="Loading car details..." /> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage 
          message="Failed to load car details"
          error={error}
          retryText="Go Back to Cars"
          onRetry={handleBackToCars}
        />
      </div>
    );
  }

  if (!car) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Car not found
        </h2>
        <button
          onClick={handleBackToCars}
          className={`px-6 py-3 rounded-lg font-medium ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Browse All Cars
        </button>
      </div>
    );
  }

  // Get images for selected colors
  const getExteriorImages = (): ColorImage[] => {
    if (!selectedExteriorColor) return [];
    const exteriorGallery = car.color_gallery.exterior_colors.find(
      item => item.color.name === selectedExteriorColor
    );
    return exteriorGallery?.images || [];
  };

  const getInteriorImages = (): ColorImage[] => {
    if (!selectedInteriorColor) return [];
    const interiorGallery = car.color_gallery.interior_colors.find(
      item => item.color.name === selectedInteriorColor
    );
    return interiorGallery?.images || [];
  };

  const exteriorImages = getExteriorImages();
  const interiorImages = getInteriorImages();

  // Get available color names for display
  const exteriorColorNames = car.available_exterior_colors.map(c => c.name);
  const interiorColorNames = car.available_interior_colors.map(c => c.name);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={handleBackToCars}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'text-gray-300 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Cars
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {car.manufacturer_details.name} {car.model_name} {car.variant}
              </h1>
              <p className={`text-lg mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {car.model_year} • {car.category_display} • {car.status_display}
              </p>
            </div>
            
            <div className="flex flex-col items-end">
              <div className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {formatPrice(car.base_price)}
              </div>
              {car.tax_incentive && (
                <span className={`mt-1 px-3 py-1 rounded-full text-sm ${
                  isDarkMode
                    ? 'bg-green-900/30 text-green-300'
                    : 'bg-green-100 text-green-800'
                }`}>
                  Eligible for Tax Incentive
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Selected Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="aspect-[4/3]">
                {selectedImage ? (
                  <img
                    src={buildImageUrl(selectedImage)}
                    alt={`${car.manufacturer_details.name} ${car.model_name}`}
                    className="w-full h-full object-cover"
                  />
                ) : car.main_image_url ? (
                  <img
                    src={buildImageUrl(car.main_image_url)}
                    alt={`${car.manufacturer_details.name} ${car.model_name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      No image available
                    </span>
                  </div>
                )}
                
                {/* Image Type Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedImageType === 'main'
                      ? 'bg-blue-600 text-white'
                      : selectedImageType === 'exterior'
                      ? 'bg-purple-600 text-white'
                      : 'bg-green-600 text-white'
                  }`}>
                    {selectedImageType === 'main' ? 'Main View' : 
                     selectedImageType === 'exterior' ? 'Exterior' : 'Interior'}
                  </span>
                </div>

                {/* Color Name Overlay */}
                <div className="absolute bottom-4 left-4">
                  <div className={`px-4 py-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-white/90 text-gray-900'
                  }`}>
                    <span className="font-medium">
                      {selectedImageType === 'exterior' 
                        ? selectedExteriorColor 
                        : selectedImageType === 'interior'
                        ? selectedInteriorColor
                        : 'Standard View'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Selection Tabs */}
            {(exteriorColorNames.length > 0 || interiorColorNames.length > 0) && (
              <div className={`rounded-2xl p-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                {/* Tabs */}
                <div className="flex mb-6 border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }">
                  {exteriorColorNames.length > 0 && (
                    <button
                      onClick={() => {
                        setActiveColorTab('exterior');
                        if (exteriorImages.length > 0) {
                          setSelectedImage(exteriorImages[0].image_url);
                          setSelectedImageType('exterior');
                        }
                      }}
                      className={`pb-3 px-4 font-medium text-lg relative ${
                        activeColorTab === 'exterior'
                          ? isDarkMode
                            ? 'text-purple-300'
                            : 'text-purple-600'
                          : isDarkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Exterior Colors
                      {activeColorTab === 'exterior' && (
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                          isDarkMode ? 'bg-purple-500' : 'bg-purple-500'
                        }`} />
                      )}
                    </button>
                  )}
                  
                  {interiorColorNames.length > 0 && (
                    <button
                      onClick={() => {
                        setActiveColorTab('interior');
                        if (interiorImages.length > 0) {
                          setSelectedImage(interiorImages[0].image_url);
                          setSelectedImageType('interior');
                        }
                      }}
                      className={`pb-3 px-4 font-medium text-lg relative ${
                        activeColorTab === 'interior'
                          ? isDarkMode
                            ? 'text-green-300'
                            : 'text-green-600'
                          : isDarkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Interior Colors
                      {activeColorTab === 'interior' && (
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                          isDarkMode ? 'bg-green-500' : 'bg-green-500'
                        }`} />
                      )}
                    </button>
                  )}
                </div>

                {/* Color Selection as Images */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {activeColorTab === 'exterior' 
                    ? exteriorColorNames.map((colorName, index) => {
                        const colorGallery = car.color_gallery.exterior_colors.find(
                          item => item.color.name === colorName
                        );
                        const firstImage = colorGallery?.images[0];
                        
                        return (
                          <button
                            key={colorName}
                            onClick={() => handleColorSelect(colorName, 'exterior')}
                            className={`group relative aspect-square rounded-xl overflow-hidden ${
                              selectedExteriorColor === colorName
                                ? 'ring-2 ring-blue-500'
                                : ''
                            }`}
                          >
                            {firstImage ? (
                              <img
                                src={buildImageUrl(firstImage.image_url)}
                                alt={`${colorName} exterior`}
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
                            
                            {/* Color Name Overlay */}
                            <div className={`absolute inset-x-0 bottom-0 p-2 text-center text-xs font-medium ${
                              selectedExteriorColor === colorName
                                ? 'bg-blue-600 text-white'
                                : 'bg-black/70 text-white'
                            }`}>
                              {colorName}
                            </div>
                            
                            {/* Selection Indicator */}
                            {selectedExteriorColor === colorName && (
                              <div className="absolute top-2 right-2">
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </button>
                        );
                      })
                    : interiorColorNames.map((colorName, index) => {
                        const colorGallery = car.color_gallery.interior_colors.find(
                          item => item.color.name === colorName
                        );
                        const firstImage = colorGallery?.images[0];
                        
                        return (
                          <button
                            key={colorName}
                            onClick={() => handleColorSelect(colorName, 'interior')}
                            className={`group relative aspect-square rounded-xl overflow-hidden ${
                              selectedInteriorColor === colorName
                                ? 'ring-2 ring-green-500'
                                : ''
                            }`}
                          >
                            {firstImage ? (
                              <img
                                src={buildImageUrl(firstImage.image_url)}
                                alt={`${colorName} interior`}
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
                            
                            {/* Color Name Overlay */}
                            <div className={`absolute inset-x-0 bottom-0 p-2 text-center text-xs font-medium ${
                              selectedInteriorColor === colorName
                                ? 'bg-green-600 text-white'
                                : 'bg-black/70 text-white'
                            }`}>
                              {colorName}
                            </div>
                            
                            {/* Selection Indicator */}
                            {selectedInteriorColor === colorName && (
                              <div className="absolute top-2 right-2">
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
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
              </div>
            )}

            {/* Gallery Thumbnails */}
            {(exteriorImages.length > 0 || interiorImages.length > 0) && (
              <div className={`rounded-2xl p-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Gallery
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {/* Active Color Images */}
                  {(activeColorTab === 'exterior' ? exteriorImages : interiorImages).map((image) => (
                    <button
                      key={image.id}
                      onClick={() => handleImageClick(image.image_url, activeColorTab)}
                      className={`aspect-square rounded-lg overflow-hidden ${
                        selectedImage === image.image_url && selectedImageType === activeColorTab
                          ? 'ring-2 ring-blue-500'
                          : ''
                      }`}
                    >
                      <img
                        src={buildImageUrl(image.image_url)}
                        alt={`${activeColorTab} view`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Specifications */}
          <div className="space-y-6">
            {/* Manufacturer Info */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                {car.manufacturer_details.logo_url && (
                  <img
                    src={buildImageUrl(car.manufacturer_details.logo_url)}
                    alt={car.manufacturer_details.name}
                    className="w-16 h-16 object-contain"
                  />
                )}
                <div>
                  <h3 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {car.manufacturer_details.name}
                  </h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {car.manufacturer_details.country} • Founded {car.manufacturer_details.founded_year}
                  </p>
                  {car.manufacturer_details.is_ev_only && (
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                      isDarkMode
                        ? 'bg-green-900/30 text-green-300'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      EV-Only Manufacturer
                    </span>
                  )}
                </div>
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {car.manufacturer_details.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {/* <a
                  href={car.manufacturer_details.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Visit Manufacturer Website
                </a> */}
                 <Link to={car.manufacturer_details.website}>
                    <FindCarsButton isDark={isDarkMode} text='Visit Manufacturer Website'/>
                </Link>
                <button
                  onClick={() => window.open(`mailto:info@${car.manufacturer_details.name.toLowerCase()}.com`)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Contact Manufacturer
                </button>
              </div>
            </div>

{/* Key Specifications Cards */}
<div className={`rounded-2xl p-6 ${
  isDarkMode ? 'bg-gray-800' : 'bg-white'
}`}>
  <h3 className={`text-xl font-bold mb-6 ${
    isDarkMode ? 'text-white' : 'text-gray-900'
  }`}>
    Key Specifications
  </h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Performance Card */}
    <div className={`group relative rounded-lg p-4 transition-all duration-300 overflow-hidden ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' 
        : 'bg-white border border-gray-200 hover:border-gray-300'
    } hover:scale-[1.02] shadow-lg hover:shadow-xl`}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Performance
          </span>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Range (WLTP)
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.range_wltp} km
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              0-100 km/h
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.acceleration_0_100} s
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Top Speed
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.top_speed} km/h
            </p>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </div>

    {/* Battery & Power Card */}
    <div className={`group relative rounded-lg p-4 transition-all duration-300 overflow-hidden ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' 
        : 'bg-white border border-gray-200 hover:border-gray-300'
    } hover:scale-[1.02] shadow-lg hover:shadow-xl`}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Battery & Power
          </span>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Motor Power
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.motor_power} HP
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Battery Capacity
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.battery_capacity} kWh
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Drive Type
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.drive_type_display}
            </p>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </div>

    {/* Charging Card */}
    <div className={`group relative rounded-lg p-4 transition-all duration-300 overflow-hidden ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' 
        : 'bg-white border border-gray-200 hover:border-gray-300'
    } hover:scale-[1.02] shadow-lg hover:shadow-xl`}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Charging
          </span>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              DC Fast Charging
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.max_dc_charging} kW
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              10-80% Charge
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.charging_time_10_80} min
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Charging Port
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.charging_port_location_display}
            </p>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </div>

    {/* Dimensions Card */}
    <div className={`group relative rounded-lg p-4 transition-all duration-300 overflow-hidden ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' 
        : 'bg-white border border-gray-200 hover:border-gray-300'
    } hover:scale-[1.02] shadow-lg hover:shadow-xl`}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <span className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Dimensions
          </span>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Length × Width
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.length} × {car.width} mm
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Seating
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.seating_capacity} seats
            </p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Category
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {car.category_display}
            </p>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </div>

    {/* Features Card */}
    <div className={`group relative rounded-lg p-4 transition-all duration-300 overflow-hidden ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' 
        : 'bg-white border border-gray-200 hover:border-gray-300'
    } hover:scale-[1.02] shadow-lg hover:shadow-xl`}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <span className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Features
          </span>
        </div>
        
        <div className="space-y-2">
          {car.has_heat_pump && (
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Heat Pump
              </span>
            </div>
          )}
          {car.has_v2l && (
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Vehicle-to-Load
              </span>
            </div>
          )}
          {car.has_one_pedal_driving && (
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                One-Pedal Driving
              </span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              {car.autopilot_level_display}
            </span>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </div>

    {/* Warranty Card */}
    <div className={`group relative rounded-lg p-4 transition-all duration-300 overflow-hidden ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' 
        : 'bg-white border border-gray-200 hover:border-gray-300'
    } hover:scale-[1.02] shadow-lg hover:shadow-xl`}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Warranty
          </span>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Battery Warranty
            </p>
            <div className="flex items-baseline gap-2">
              <p className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {car.battery_warranty_years} years
              </p>
              <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                or {car.battery_warranty_km.toLocaleString()} km
              </span>
            </div>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Vehicle Status
            </p>
            <p className={`text-lg font-bold ${
              car.status_display === 'Available' 
                ? 'text-green-600'
                : car.status_display === 'Coming Soon'
                ? 'text-blue-600'
                : 'text-orange-600'
            }`}>
              {car.status_display}
            </p>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </div>
  </div>
</div>
            {/* Description & Features
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Description
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {car.description}
              </p>
              
              {car.key_features && (
                <>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Key Features
                  </h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {car.key_features}
                  </p>
                </>
              )}
              
              {car.safety_features && (
                <>
                  <h4 className={`text-lg font-semibold mt-6 mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Safety Features
                  </h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {car.safety_features}
                  </p>
                </>
              )}
            </div> */}

            {/* Action Buttons */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <button
                  onClick={() => alert('Test drive scheduled!')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Schedule Test Drive
                </button> */}
                <FindCarsButton isDark={isDarkMode} onClick={() => alert('Conatc the seller!')} text='Contact The Seller'/>
                <button
                  onClick={() => alert('Inquiry sent!')}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  Request More Info
                </button>
                {car.brochure_url && (
                  <a
                    href={buildImageUrl(car.brochure_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg text-center ${
                      isDarkMode
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-purple-500 hover:bg-purple-600 text-white'
                    }`}
                  >
                    Download Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;