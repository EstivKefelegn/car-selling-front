// pages/news/components/NewsFooter.tsx
import React from 'react';

interface NewsFooterProps {
  isDarkMode: boolean;
}

const NewsFooter: React.FC<NewsFooterProps> = ({ isDarkMode }) => {
  return (
    <footer className="mt-20">
      <div className={`py-12 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center">
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Stay Updated
            </h3>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Subscribe to our newsletter for the latest EV news, reviews, and updates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className={`flex-1 px-6 py-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg'
                }`}
              >
                Subscribe
              </button>
            </div>
            
            <p className={`mt-8 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              © {new Date().getFullYear()} EV News Network. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewsFooter;