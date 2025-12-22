import React, { useState } from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useServices from '../../hooks/services/useServices';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorMessage from '../../utils/ErrorMessage';
import ServiceHero from './ServiceHero';
import ServiceCategories from './ServiceCategories';
import ServiceGrid from './ServiceGrid';
import ServiceTestimonials from './ServiceTestimonials';
import ServiceFAQs from './ServiceFAQs';
import ServiceCenters from './ServiceCenters';
import ServiceCTA from './ServiceCTA';
import ServiceBookingModal from './ServiceBooking/ServiceBookingModal';
import { useTranslation } from 'react-i18next';

import heroBgLight from '../../assets/service.jpg';
import heroBgDark from '../../assets/service.jpg';

const ServicesPage: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const { servicesData, loading, error, refresh } = useServices();
  const { categories, services, testimonials, faqs, serviceCenters } = servicesData;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );

  if (error) return (
    <ErrorMessage
      message={t('FAILED_TO_LOAD_SERVICES')}
      error={error}
      retryText={t('TRY_AGAIN')}
      onRetry={refresh}
    />
  );

  const specialOffers = services.filter(service => service.is_special_offer);
  const netaServices = services.filter(service => service.is_neta_battery_warranty);
  const firstRoundServices = services.filter(service => service.is_first_round_service);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      
      {/* Hero Section */}
      <ServiceHero
        title={t('PREMIUM_EV_SERVICES')}
        description={t('SERVICE_HERO_DESCRIPTION')}
        isDarkMode={isDarkMode}
        backgroundImage={isDarkMode ? heroBgDark : heroBgLight}
        onBookService={() => setIsModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Categories Section */}
        <ServiceCategories categories={categories} isDarkMode={isDarkMode} />

        {/* Special Offers */}
        {specialOffers.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">{t('SPECIAL_SERVICE_OFFERS')}</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
              }`}>
                {t('LIMITED_TIME')}
              </span>
            </div>
            <ServiceGrid services={specialOffers} isDarkMode={isDarkMode} />
          </div>
        )}

        {/* NETA Services */}
        {netaServices.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">{t('NETA_EXCLUSIVE_SERVICES')}</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
                {t('NETA_OWNERS_ONLY')}
              </span>
            </div>
            <ServiceGrid services={netaServices} isDarkMode={isDarkMode} />
          </div>
        )}

        {/* Complimentary Services */}
        {firstRoundServices.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">{t('COMPLIMENTARY_SERVICES')}</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
              }`}>
                {t('FREE_FOR_ALL')}
              </span>
            </div>
            <ServiceGrid services={firstRoundServices} isDarkMode={isDarkMode} />
          </div>
        )}

        {/* Service Centers */}
        {serviceCenters.length > 0 && (
          <div className="mt-16">
            <ServiceCenters
              centers={serviceCenters}
              isDarkMode={isDarkMode}
              onBookService={() => setIsModalOpen(true)}
            />
          </div>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="mt-16">
            <ServiceTestimonials testimonials={testimonials} isDarkMode={isDarkMode} />
          </div>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="mt-16">
            <ServiceFAQs faqs={faqs} isDarkMode={isDarkMode} />
          </div>
        )}

        {/* CTA */}
        <div className="mt-16">
          <ServiceCTA isDarkMode={isDarkMode} onBookService={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* Booking Modal */}
      <ServiceBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default ServicesPage;
