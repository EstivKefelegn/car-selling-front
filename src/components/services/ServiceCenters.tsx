// pages/services/ServiceCenters.tsx
import React from 'react';

interface ServiceCenter {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  opening_hours: Record<string, string>;
  has_ev_charging: boolean;
  has_waiting_lounge: boolean;
  has_loaner_cars: boolean;
  has_mobile_service: boolean;
  is_main_center: boolean;
}

interface ServiceCentersProps {
  centers: ServiceCenter[];
  isDarkMode: boolean;
}

const ServiceCenters: React.FC<ServiceCentersProps> = ({ 
  centers, 
  isDarkMode 
}) => {
  if (!centers || centers.length === 0) return null;

  // Group centers by city
  const centersByCity = centers.reduce((acc, center) => {
    if (!acc[center.city]) acc[center.city] = [];
    acc[center.city].push(center);
    return acc;
  }, {} as Record<string, ServiceCenter[]>);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Our Service Centers</h2>
      
      <div className="space-y-8">
        {Object.entries(centersByCity).map(([city, cityCenters]) => (
          <div key={city}>
            <h3 className="text-2xl font-bold mb-4">{city}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityCenters.map((center) => (
                <div 
                  key={center.id}
                  className={`rounded-xl p-6 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                      : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
                  } shadow-lg`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold">{center.name}</h4>
                    {center.is_main_center && (
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode 
                          ? 'bg-blue-900/30 text-blue-300' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        Main Center
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="opacity-90">{center.address}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${center.phone}`} className="hover:text-blue-500">
                        {center.phone}
                      </a>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="mb-6">
                    <h5 className="font-semibold mb-2">Facilities:</h5>
                    <div className="flex flex-wrap gap-2">
                      {center.has_ev_charging && (
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-green-900/30 text-green-300' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          EV Charging
                        </span>
                      )}
                      {center.has_waiting_lounge && (
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-blue-900/30 text-blue-300' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          Waiting Lounge
                        </span>
                      )}
                      {center.has_loaner_cars && (
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-purple-900/30 text-purple-300' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          Loaner Cars
                        </span>
                      )}
                      {center.has_mobile_service && (
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-orange-900/30 text-orange-300' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          Mobile Service
                        </span>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => console.log('Book appointment at:', center.id)}
                    className={`group relative w-full px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                        : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                    } hover:scale-105 font-semibold`}
                  >
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Book Appointment</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCenters;