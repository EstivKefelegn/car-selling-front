// components/about/ContactSection.tsx
import React from 'react';
import { MapPin, Phone, Mail, Globe, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { type AboutUsData } from './types/about';

interface ContactSectionProps {
  data: AboutUsData;
  isDarkMode: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ data, isDarkMode }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MapPin className="mr-3 text-blue-600 dark:text-blue-400" />
              Our Location
            </h2>
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <p className="text-lg mb-4">{data.full_address}</p>
              
              {data.coordinates && (
                <a
                  href={`https://www.google.com/maps?q=${data.coordinates.latitude},${data.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Globe size={18} className="mr-2" />
                  View on Google Maps
                </a>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className={`p-6 rounded-xl space-y-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <div className="flex items-center">
                <Phone className="mr-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium">{data.phone_number}</p>
                  {data.secondary_phone && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{data.secondary_phone}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="mr-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <a href={`mailto:${data.email}`} className="font-medium hover:text-blue-600 dark:hover:text-blue-400">
                    {data.email}
                  </a>
                  {data.support_email && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Support: <a href={`mailto:${data.support_email}`} className="hover:underline">{data.support_email}</a>
                    </p>
                  )}
                </div>
              </div>
              
              {data.website && (
                <div className="flex items-center">
                  <Globe className="mr-4 text-blue-600 dark:text-blue-400" />
                  <a 
                    href={data.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {data.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          {Object.keys(data.social_media_links).length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
              <div className="flex space-x-4">
                {data.social_media_links.facebook && (
                  <a 
                    href={data.social_media_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Facebook size={20} />
                  </a>
                )}
                {data.social_media_links.twitter && (
                  <a 
                    href={data.social_media_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-black dark:bg-gray-700 text-white hover:bg-gray-800"
                  >
                    <Twitter size={20} />
                  </a>
                )}
                {data.social_media_links.instagram && (
                  <a 
                    href={data.social_media_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {data.social_media_links.linkedin && (
                  <a 
                    href={data.social_media_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {data.social_media_links.youtube && (
                  <a 
                    href={data.social_media_links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700"
                  >
                    <Youtube size={20} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Business Hours */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="mr-3 text-blue-600 dark:text-blue-400" />
            Business Hours
          </h2>
          
          <div className={`p-6 rounded-xl space-y-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            {data.business_hours.map((hours, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-center p-3 rounded-lg ${
                  hours.is_open 
                    ? isDarkMode ? 'bg-gray-700' : 'bg-blue-50' 
                    : isDarkMode ? 'bg-gray-700 opacity-60' : 'bg-gray-50'
                }`}
              >
                <span className="font-medium">{hours.day}</span>
                {hours.is_open ? (
                  <span className="text-green-600 dark:text-green-400">
                    {hours.open_time} - {hours.close_time}
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;