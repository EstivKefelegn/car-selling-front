// components/about/sections/ContactDetails.tsx
import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { type AboutUsData } from '../types/about';

interface ContactDetailsProps {
  data: AboutUsData;
  isDarkMode: boolean;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ data, isDarkMode }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      <div className={`p-6 rounded-xl space-y-6 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg`}>
        <ContactItem
          icon={<Phone className={`mr-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={24} />}
        >
          <p className="font-medium text-lg">{data.phone_number}</p>
          {data.secondary_phone && (
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Alternate: {data.secondary_phone}
            </p>
          )}
        </ContactItem>
        
        <ContactItem
          icon={<Mail className={`mr-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={24} />}
        >
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
        </ContactItem>
        
        {data.website && (
          <ContactItem
            icon={<Globe className={`mr-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={24} />}
          >
            <a 
              href={data.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-lg hover:underline block"
            >
              {data.website.replace(/^https?:\/\//, '')}
            </a>
          </ContactItem>
        )}
      </div>
    </div>
  );
};

const ContactItem: React.FC<{
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ icon, children }) => {
  return (
    <div className="flex items-center">
      {icon}
      <div>
        {children}
      </div>
    </div>
  );
};

export default ContactDetails;