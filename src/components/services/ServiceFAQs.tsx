// pages/services/ServiceFAQs.tsx
import React, { useState } from 'react';

interface ServiceFAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  category_display: string;
}

interface ServiceFAQsProps {
  faqs: ServiceFAQ[];
  isDarkMode: boolean;
}

const ServiceFAQs: React.FC<ServiceFAQsProps> = ({ 
  faqs, 
  isDarkMode 
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Filter FAQs by category
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className={`rounded-2xl p-6 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
    }`}>
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All' : category.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div 
            key={faq.id}
            className={`rounded-lg overflow-hidden transition-all ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } ${expandedId === faq.id ? 'shadow-lg' : ''}`}
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full text-left p-4 flex justify-between items-center hover:bg-opacity-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
                }`}>
                  <span className="font-bold">Q</span>
                </div>
                <span className="font-semibold">{faq.question}</span>
              </div>
              <svg 
                className={`w-5 h-5 transition-transform ${expandedId === faq.id ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`px-4 overflow-hidden transition-all duration-300 ${
              expandedId === faq.id ? 'max-h-96 pb-4' : 'max-h-0'
            }`}>
              <div className="pl-11 border-l-2 border-blue-500">
                <p className="opacity-80">{faq.answer}</p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {faq.category_display}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFAQs;