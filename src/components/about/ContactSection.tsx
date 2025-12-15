// components/about/sections/ContactSection.tsx
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Globe, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube, Navigation, Car } from 'lucide-react';
import { type AboutUsData } from './types/about';
import MapComponent from './MapComponent';

interface ContactSectionProps {
  data: AboutUsData;
  isDarkMode: boolean; 
}

const ContactSection: React.FC<ContactSectionProps> = ({ data, isDarkMode }) => {
  const [showMap, setShowMap] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Only render map on client side to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleViewOnMaps = () => {
    if (data.coordinates?.latitude && data.coordinates?.longitude) {
      window.open(
        `https://www.google.com/maps?q=${data.coordinates.latitude},${data.coordinates.longitude}`,
        '_blank'
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Contact Information */}
        <div className="space-y-8">
          {/* Location with Map Toggle */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <MapPin className="mr-3" size={24} />
                Our Location
              </h2>
              <button
                onClick={() => setShowMap(!showMap)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Navigation size={18} className="mr-2" />
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
            
            <div  className={`p-6 rounded-xl mb-6 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg`}>
              <p className="text-lg mb-4">{data.full_address || data.address}</p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleViewOnMaps}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  <Globe size={18} className="mr-2" />
                  View on Google Maps
                </button>
                
                <button
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude: userLat, longitude: userLng } = position.coords;
                        window.open(
                          `https://www.google.com/maps/dir/${userLat},${userLng}/${data.coordinates.latitude},${data.coordinates.longitude}`,
                          '_blank'
                        );
                      });
                    }
                  }}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'border border-gray-600 hover:bg-gray-700 text-gray-300' 
                      : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Car size={18} className="mr-2" />
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          {/* Map Display (when showMap is true) */}
          {showMap && isClient && data.coordinates && (
            <div className="mb-8">
              <MapComponent
                latitude={data.coordinates.latitude}
                longitude={data.coordinates.longitude}
                address={data.full_address || data.address}
                dealershipName={data.dealership_name}
                className="h-80 w-full rounded-xl shadow-lg"
                id="contact-section"
              />
            </div>
          )}

          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className={`p-6 rounded-xl space-y-6 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg`}>
              <div className="flex items-center">
                <Phone className={`mr-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={24} />
                <div>
                  <p className="font-medium text-lg">{data.phone_number}</p>
                  {data.secondary_phone && (
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Alternate: {data.secondary_phone}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className={`mr-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={24} />
                <div>
                  <a 
                    href={`mailto:${data.email}`} 
                    className="font-medium text-lg hover:underline block"
                  >
                    {data.email}
                  </a>
                  {data.support_email && (
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Support: <a href={`mailto:${data.support_email}`} className="hover:underline">{data.support_email}</a>
                    </p>
                  )}
                </div>
              </div>
              
              {data.website && (
                <div className="flex items-center">
                  <Globe className={`mr-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={24} />
                  <a 
                    href={data.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-lg hover:underline block"
                  >
                    {data.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          {data.social_media_links && Object.keys(data.social_media_links).length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
              <div className="flex space-x-4">
                {data.social_media_links.facebook && (
                  <a 
                    href={data.social_media_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full hover:scale-110 transition-transform ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Facebook size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </a>
                )}
                {data.social_media_links.twitter && (
                  <a 
                    href={data.social_media_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full hover:scale-110 transition-transform ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Twitter size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </a>
                )}
                {data.social_media_links.instagram && (
                  <a 
                    href={data.social_media_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full hover:scale-110 transition-transform ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Instagram size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </a>
                )}
                {data.social_media_links.linkedin && (
                  <a 
                    href={data.social_media_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full hover:scale-110 transition-transform ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Linkedin size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </a>
                )}
                {data.social_media_links.youtube && (
                  <a 
                    href={data.social_media_links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full hover:scale-110 transition-transform ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Youtube size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Business Hours */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="mr-3" size={24} />
            Business Hours
          </h2>
          
          <div className={`p-6 rounded-xl space-y-4 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            {data.business_hours && data.business_hours.length > 0 ? (
              data.business_hours.map((hours, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    hours.is_open 
                      ? isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100' 
                      : isDarkMode ? 'bg-gray-700/30 opacity-60' : 'bg-gray-100/50 opacity-70'
                  }`}
                >
                  <span className="font-medium">{hours.day}</span>
                  {hours.is_open ? (
                    <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                      {hours.open_time} - {hours.close_time}
                    </span>
                  ) : (
                    <span className={isDarkMode ? 'text-red-400' : 'text-red-600'}>Closed</span>
                  )}
                </div>
              ))
            ) : (
              // Default business hours if none provided
              <>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}>
                  <span className="font-medium">Monday - Friday</span>
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                    8:00 AM - 6:00 PM
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}>
                  <span className="font-medium">Saturday</span>
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
                    9:00 AM - 5:00 PM
                  </span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/30 opacity-60' : 'bg-gray-100/50 opacity-70'
                }`}>
                  <span className="font-medium">Sunday</span>
                  <span className={isDarkMode ? 'text-red-400' : 'text-red-600'}>Closed</span>
                </div>
              </>
            )}
            
            {/* Map Button in Business Hours section */}
            <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setShowMap(!showMap)}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                } shadow-md hover:shadow-lg`}
              >
                <MapPin size={20} className="mr-3" />
                {showMap ? 'Hide Interactive Map' : 'Show Interactive Map'}
              </button>
            </div>
          </div>
          
          {/* Mini map preview */}
          {!showMap && isClient && data.coordinates && (
            <div className="mt-8">
              <div className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              } shadow-lg`}>
                <h3 className="text-lg font-bold mb-4">Find Us Easily</h3>
                <div className="h-48 w-full rounded-lg overflow-hidden">
                  <MapComponent
                    latitude={data.coordinates.latitude}
                    longitude={data.coordinates.longitude}
                    zoom={14}
                    className="h-full w-full"
                  />
                </div>
                <button
                  onClick={() => setShowMap(true)}
                  className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'border border-gray-600 hover:bg-gray-700 text-gray-300' 
                      : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Open Full Screen Map
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;