// pages/about/components/HeroSection.tsx
import React from 'react';
import { Sparkles, Award, Car, Shield, TrendingUp } from 'lucide-react';
import { type AboutUsData } from '../types/about';

interface HeroSectionProps {
  about: AboutUsData;
  isDarkMode: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ about, isDarkMode }) => {
  const stats = [
    { icon: Award, value: "15+", label: "Years Excellence" },
    { icon: Car, value: "1000+", label: "EVs Delivered" },
    { icon: Shield, value: "98%", label: "Satisfaction Rate" },
    { icon: TrendingUp, value: "50+", label: "Brand Partners" },
  ];

  return (
    <div className={`relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-white to-gray-100'
    }`}>
      <div className="container relative mx-auto px-4 py-10 md:py-5">
        <div className="max-w-5xl mx-auto">
          {/* Logo */}
          {about.logo_url && (
            <div className="mb-10">
              <img 
                src={about.logo_url} 
                alt={about.dealership_name}
                className="h-28 md:h-50 mx-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Tagline */}
          {about.tagline && (
            <div className="flex items-center justify-center mb-10">
              <Sparkles className={`mr-3 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} size={24} />
              <p className={`text-xl md:text-2xl font-semibold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {about.tagline}
              </p>
              <Sparkles className={`ml-3 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} size={24} />
            </div>
          )}
          
          {/* Description */}
          <div className={`relative p-8 md:p-10 rounded-2xl ${
            isDarkMode 
              ? 'bg-gray-800/50 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <p className={`text-lg md:text-xl leading-relaxed text-center ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {about.description}
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className={`p-4 rounded-xl text-center ${
                isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className={`mr-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} size={20} />
                  <span className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </span>
                </div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;