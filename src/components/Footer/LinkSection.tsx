// components/Footer/LinksSection.tsx
import React from 'react';
import { LINK_SECTIONS } from './constants';

interface LinksSectionProps {
  isDarkMode: boolean;
}

const LinksSection: React.FC<LinksSectionProps> = ({ isDarkMode }) => (
  <div className="grid grid-cols-2 gap-6">
    {LINK_SECTIONS.map((section) => (
      <div key={section.title}>
        <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {section.title}
        </h4>
        <ul className="space-y-2 text-sm">
          {section.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`hover:underline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default LinksSection;