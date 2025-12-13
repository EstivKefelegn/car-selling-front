// components/Footer/ContactSection.tsx
import React from 'react';
import { CONTACT_INFO } from './constants';

interface ContactSectionProps {
  isDarkMode: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ isDarkMode }) => (
  <div>
    <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      Contact
    </h4>
    <ul className="space-y-3 text-sm">
      {CONTACT_INFO.map((info, index) => (
        <li key={index} className="flex items-center gap-2">
          <div className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
            {info.icon}
          </div>
          <span>{info.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ContactSection;