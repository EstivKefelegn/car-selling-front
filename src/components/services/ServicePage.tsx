// pages/ServicesPage.tsx
import React from 'react';
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

// Import background images
import heroBgLight from '../../assets/service.jpg';
import heroBgDark from '../../assets/service.jpg';

const ServicesPage: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  
  // Use the services hook
  const { 
    servicesData, 
    loading, 
    error, 
    refresh 
  } = useServices();

  const { 
    categories, 
    services, 
    testimonials, 
    faqs, 
    serviceCenters 
  } = servicesData;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        message="Failed to load services"
        error={error}
        retryText="Try Again"
        onRetry={refresh}
      />
    );
  }

  // Filter special offers
  const specialOffers = services.filter(service => service.is_special_offer);
  
  // Filter NETA services
  const netaServices = services.filter(service => service.is_neta_battery_warranty);
  
  // Filter first round services
  const firstRoundServices = services.filter(service => service.is_first_round_service);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      {/* Hero Section with Background Image */}
      <ServiceHero 
        title="Premium EV Services"
        description="Expert maintenance, warranty protection, and comprehensive support for your electric vehicle"
        isDarkMode={isDarkMode}
        backgroundImage={isDarkMode ? heroBgDark : heroBgLight}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Section */}
        <ServiceCategories 
          categories={categories}
          isDarkMode={isDarkMode}
        />

        {/* Special Offers Section */}
        {specialOffers.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Special Service Offers</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                isDarkMode 
                  ? 'bg-red-900/30 text-red-300' 
                  : 'bg-red-100 text-red-700'
              }`}>
                Limited Time
              </span>
            </div>
            <ServiceGrid 
              services={specialOffers}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* NETA Exclusive Services */}
        {netaServices.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">NETA Exclusive Services</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                isDarkMode 
                  ? 'bg-blue-900/30 text-blue-300' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                NETA Owners Only
              </span>
            </div>
            <ServiceGrid 
              services={netaServices}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* First Round Services */}
        {firstRoundServices.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Complimentary Services</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                isDarkMode 
                  ? 'bg-green-900/30 text-green-300' 
                  : 'bg-green-100 text-green-700'
              }`}>
                Free for All
              </span>
            </div>
            <ServiceGrid 
              services={firstRoundServices}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* All Services */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">All EV Services</h2>
          <ServiceGrid 
            services={services}
            isDarkMode={isDarkMode}
            showCategories={true}
          />
        </div>

        {/* Service Centers */}
        {serviceCenters.length > 0 && (
          <div className="mt-16">
            <ServiceCenters 
              centers={serviceCenters}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="mt-16">
            <ServiceTestimonials 
              testimonials={testimonials}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="mt-16">
            <ServiceFAQs 
              faqs={faqs}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16">
          <ServiceCTA 
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;