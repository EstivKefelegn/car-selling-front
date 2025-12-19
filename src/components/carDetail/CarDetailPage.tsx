// pages/CarDetailPage/CarDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCarDetails from '../../hooks/cars/useCarDetails';
import { useDarkModeStore } from '../../store/useDarkModeStore';

import BackButton from './components/BackButton';
import CarHeader from './components/CarHeader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ManufacturerCard from './components/ManufacturerCard';
import SpecificationsGrid from './components/Specifications/SpecificationsGrid';
import ActionButtons from './components/ActionButtons';
import ContactSellerForm from './components/ContactSellerForm';
import ErrorMessage from '../../utils/ErrorMessage';

const CarDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkModeStore();
  const { data: car, loading, error } = useCarDetails(slug || '');

  const [selectedExteriorColor, setSelectedExteriorColor] = useState<string | null>(null);
  const [selectedInteriorColor, setSelectedInteriorColor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageType, setSelectedImageType] =
    useState<'main' | 'exterior' | 'interior'>('main');
  const [activeColorTab, setActiveColorTab] =
    useState<'exterior' | 'interior'>('exterior');
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (!car) return;

    setSelectedExteriorColor(car.available_exterior_colors[0]?.name ?? null);
    setSelectedInteriorColor(car.available_interior_colors[0]?.name ?? null);
    setSelectedImage(car.main_image_url);
    setSelectedImageType('main');
  }, [car]);

  if (loading) return null;

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load car details"
        error={error}
        retryText="Go Back"
        onRetry={() => navigate('/cars')}
      />
    );
  }

  if (!car) return null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-4">
        <BackButton onClick={() => navigate('/cars')} />
      </div>

      <div className="container mx-auto px-4 pb-12 space-y-8">
        <CarHeader car={car} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImageGallery
            car={car}
            isDarkMode={isDarkMode}
            selectedImage={selectedImage}
            selectedImageType={selectedImageType}
            activeColorTab={activeColorTab}
            selectedExteriorColor={selectedExteriorColor}
            selectedInteriorColor={selectedInteriorColor}
            onImageChange={setSelectedImage}
            onImageTypeChange={setSelectedImageType}
            onExteriorColorChange={setSelectedExteriorColor}
            onInteriorColorChange={setSelectedInteriorColor}
            onTabChange={setActiveColorTab}
          />

          <div className="space-y-6">
             <ManufacturerCard
              car={car}
              isDarkMode={isDarkMode}
            />
            <SpecificationsGrid
  car={car}
  isDarkMode={isDarkMode}
/>
            <ActionButtons
              car={car}
              isDarkMode={isDarkMode}
              onContactClick={() => setShowContactForm(true)}
            />
          </div>
        </div>
      </div>

      {showContactForm && (
        <ContactSellerForm
          carId={car.id}
          carDisplayName={`${car.manufacturer_details.name} ${car.model_name} ${car.variant}`}
          isDarkMode={isDarkMode}
          onClose={() => setShowContactForm(false)}
          onSuccess={() => alert('Submitted successfully')}
        />
      )}
    </div>
  );
};

export default CarDetailPage;
