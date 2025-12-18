// pages/about/components/NavigationTabs.tsx
import React from 'react';
import { History, MapPin } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: 'about' | 'contact';
  onTabChange: (tab: 'about' | 'contact') => void;
  isDarkMode: boolean;
  scrolled: boolean;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  isDarkMode,
  scrolled
}) => {
  const tabs = [
    { id: 'about', icon: History, label: 'Our Story' },
    { id: 'contact', icon: MapPin, label: 'Find Us' },
  ];

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? `${isDarkMode ? 'bg-gray-900' : 'bg-white'}` 
        : `${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`group flex-1 py-5 px-2 text-center font-semibold whitespace-nowrap transition-all duration-300 relative ${
                activeTab === tab.id
                  ? isDarkMode ? 'text-white border-b-2 border-white' : 'text-gray-900 border-b-2 border-gray-900'
                  : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="relative">
                <tab.icon size={22} className="inline-block mr-3 mb-1" />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;