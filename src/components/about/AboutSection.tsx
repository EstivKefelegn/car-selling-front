import React from 'react';
import { Target, Award, Heart, History, Wrench, Car, Star } from 'lucide-react';
import { type AboutUsData } from './types/about';

interface AboutSectionProps {
  data: AboutUsData;
  isDarkMode: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data, isDarkMode }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Mission & Vision */}
      {(data.mission_statement || data.vision_statement) && (
        <div className="grid md:grid-cols-2 gap-8">
          {data.mission_statement && (
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg`}>
              <div className="flex items-center mb-4">
                <Target className={`mr-3 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} size={24} />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Our Mission
                </h2>
              </div>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {data.mission_statement}
              </p>
            </div>
          )}
          {data.vision_statement && (
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg`}>
              <div className="flex items-center mb-4">
                <Award className={`mr-3 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} size={24} />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Our Vision
                </h2>
              </div>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {data.vision_statement}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Core Values */}
      {data.core_values && (
        <div className={`p-8 rounded-xl ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex items-center mb-6">
            <Heart className={`mr-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} size={24} />
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Core Values
            </h2>
          </div>
          <div className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {data.core_values.split('\n').map((value, index) => (
              <div key={index} className="flex items-start mb-4">
                <Star size={20} className={`mt-1 mr-3 flex-shrink-0 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <p>{value.trim()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {data.history && (
        <div className={`p-8 rounded-xl ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex items-center mb-6">
            <History className={`mr-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} size={24} />
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our History
            </h2>
          </div>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {data.history}
          </p>
        </div>
      )}

      {/* Services & Brands */}
      <div className="grid md:grid-cols-2 gap-8">
        {data.services_offered && (
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center mb-4">
              <Wrench className={`mr-3 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} size={24} />
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Services Offered
              </h2>
            </div>
            <div className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {data.services_offered.split('\n').map((service, index) => (
                <p key={index} className="mb-2">• {service.trim()}</p>
              ))}
            </div>
          </div>
        )}

        {data.brands_carried && (
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center mb-4">
              <Car className={`mr-3 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} size={24} />
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Brands We Carry
              </h2>
            </div>
            <div className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {data.brands_carried.split('\n').map((brand, index) => (
                <p key={index} className="mb-2">• {brand.trim()}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;