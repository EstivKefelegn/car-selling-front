// components/finance/FinanceFeatures.tsx (continued)
import React from 'react';

interface FinanceFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface FinanceFeaturesProps {
  title: string;
  intro: string;
  features: FinanceFeature[];
  isDarkMode: boolean;
}

const FinanceFeatures: React.FC<FinanceFeaturesProps> = ({ 
  title, 
  intro, 
  features, 
  isDarkMode 
}) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {intro && <p className="text-xl mb-12 max-w-3xl mx-auto opacity-80">{intro}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features?.map((feature) => (
          <div 
            key={feature.id}
            className={`p-6 rounded-2xl transition-all hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
            } shadow-lg hover:shadow-xl`}
          >
            <div className="text-4xl mb-4 text-blue-500">
              {feature.icon.startsWith('http') ? (
                <img src={feature.icon} alt={feature.title} className="w-12 h-12 mx-auto" />
              ) : (
                <i className={feature.icon}></i>
              )}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="opacity-80">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceFeatures;