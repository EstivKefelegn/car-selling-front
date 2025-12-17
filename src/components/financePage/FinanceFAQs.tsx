// components/finance/FinanceFAQs.tsx
import React, { useState } from 'react';

interface FinanceFAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  category_display: string;
}

interface FinanceFAQsProps {
  title: string;
  faqs: FinanceFAQ[];
  isDarkMode: boolean;
  showViewAll?: boolean;
}

const FinanceFAQs: React.FC<FinanceFAQsProps> = ({
  title,
  faqs,
  isDarkMode,
  showViewAll = false
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className={`rounded-2xl p-6 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
    }`}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      <div className="space-y-4">
        {faqs.map((faq) => (
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
      
      {showViewAll && (
        <div className="mt-6 text-center">
          <button className={`px-6 py-2 rounded-lg font-medium ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}>
            View All FAQs
          </button>
        </div>
      )}
    </div>
  );
};

export default FinanceFAQs;