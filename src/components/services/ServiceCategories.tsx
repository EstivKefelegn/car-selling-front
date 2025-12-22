import React from 'react';
import { useTranslation } from 'react-i18next';

interface ServiceCategory {
  id: number;
  title: string;
  description: string;
  icon: string;
  icon_color: string;
  service_count: number;
}

interface ServiceCategoriesProps {
  categories: ServiceCategory[];
  isDarkMode: boolean;
}

const ServiceCategories: React.FC<ServiceCategoriesProps> = ({ categories, isDarkMode }) => {
  const { t } = useTranslation();

  if (!categories || categories.length === 0) return null;

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">{t('SERVICE_CATEGORIES')}</h2>
      <p className="text-xl mb-12 max-w-3xl mx-auto opacity-80">
        {t('SERVICE_CATEGORIES_DESCRIPTION')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`p-6 rounded-2xl transition-all hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
            } shadow-lg hover:shadow-xl`}
            style={{ borderLeftColor: category.icon_color, borderLeftWidth: '4px' }}
          >
            <div className="text-4xl mb-4" style={{ color: category.icon_color }}>
              {category.icon.startsWith('http') ? (
                <img src={category.icon} alt={category.title} className="w-12 h-12 mx-auto" />
              ) : (
                <i className={category.icon}></i>
              )}
            </div>
            <h3 className="text-xl font-bold mb-3">{t(category.title)}</h3>
            <p className="opacity-80 mb-4 line-clamp-2">{t(category.description)}</p>
            <div className={`text-sm px-3 py-1 rounded-full inline-block ${
              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              {category.service_count} {t('SERVICES')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategories;
        