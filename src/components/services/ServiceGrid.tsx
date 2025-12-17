// pages/services/ServiceGrid.tsx
import React from 'react';

interface Service {
  id: number;
  title: string;
  short_description: string;
  price_display: string;
  display_duration: string;
  is_special_offer: boolean;
  special_offer_text: string;
  is_current_special: boolean;
  days_remaining: number | null;
  is_neta_battery_warranty: boolean;
  is_first_round_service: boolean;
  category: {
    title: string;
    icon_color: string;
  } | null;
  features: string[];
  estimated_service_time: string;
  mobile_service_available: boolean;
  appointment_required: boolean;
}

interface ServiceGridProps {
  services: Service[];
  isDarkMode: boolean;
  showCategories?: boolean;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ 
  services, 
  isDarkMode,
  showCategories = false
}) => {
  if (!services || services.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
      }`}>
        <p className="opacity-70">No services available</p>
      </div>
    );
  }

  // Group services by category if needed
  const groupedServices = showCategories 
    ? services.reduce((acc, service) => {
        const category = service.category?.title || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(service);
        return acc;
      }, {} as Record<string, Service[]>)
    : { 'All Services': services };

  return (
    <div className="space-y-12">
      {Object.entries(groupedServices).map(([category, categoryServices]) => (
        <div key={category}>
          {showCategories && (
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{category}</h3>
              <div className="h-1 w-20 bg-blue-500 rounded"></div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryServices.map((service) => {
              const isNETA = service.is_neta_battery_warranty;
              const isFree = service.is_first_round_service;
              
              return (
                <div 
                  key={service.id}
                  className={`rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                      : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
                  } shadow-lg`}
                >
                  {/* Service Header */}
                  <div className="p-6 border-b" style={{ 
                    borderColor: isDarkMode ? '#374151' : '#E5E7EB'
                  }}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-wrap gap-2">
                        {isNETA && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white">
                            NETA Exclusive
                          </span>
                        )}
                        {isFree && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                            Free Service
                          </span>
                        )}
                        {service.is_special_offer && service.is_current_special && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                            {service.special_offer_text || 'Special Offer'}
                          </span>
                        )}
                      </div>
                      
                      {service.days_remaining && service.days_remaining > 0 && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                        }`}>
                          {service.days_remaining} days left
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm opacity-80 mb-4">{service.short_description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`text-2xl font-bold ${
                        isFree ? 'text-green-500' : 'text-blue-500'
                      }`}>
                        {service.price_display}
                      </div>
                      <div className={`text-sm px-3 py-1 rounded ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {service.display_duration}
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Service Details:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{service.estimated_service_time || '2-3 hours'}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>
                            {service.mobile_service_available ? 'Mobile service available' : 'Service center required'}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>
                            {service.appointment_required ? 'Appointment required' : 'Walk-ins welcome'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {service.features && service.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <svg className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                          {service.features.length > 3 && (
                            <li className="text-sm text-gray-500 pl-6">
                              +{service.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <button 
                      onClick={() => console.log('Book service:', service.id)}
                      className={`group relative w-full px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                          : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                      } hover:scale-105 font-semibold`}
                    >
                      <div className="relative z-10 flex items-center justify-center space-x-2">
                        <span>Book Service</span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceGrid;