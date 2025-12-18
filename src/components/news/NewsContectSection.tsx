// pages/news/components/NewsContentSection.tsx
import React from 'react';

interface NewsContentSectionProps {
  content: string;
  isDarkMode: boolean;
}

const NewsContentSection: React.FC<NewsContentSectionProps> = ({ content, isDarkMode }) => {
  const paragraphs = content.split('\r\n\r\n');

  return (
    <div className="p-8 lg:p-12">
      <div className={`prose prose-lg max-w-none ${
        isDarkMode 
          ? 'prose-invert prose-gray' 
          : 'prose-gray'
      }`}>
        {paragraphs.map((paragraph, index) => {
          // Check if paragraph might be a heading
          if (paragraph.length < 120 && !paragraph.includes('. ') && !paragraph.includes(', ')) {
            return (
              <h2 
                key={index} 
                className={`text-2xl font-bold mt-10 mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {paragraph}
              </h2>
            );
          }
          
          return (
            <p key={index} className="mb-8 leading-relaxed text-lg">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Quote Block */}
      {paragraphs.length > 3 && (
        <div className={`my-12 p-8 rounded-2xl border-l-4 ${
          isDarkMode
            ? 'bg-gray-700/50 border-blue-500'
            : 'bg-gray-50 border-blue-400'
        }`}>
          <blockquote className={`text-2xl font-medium italic leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            "{paragraphs[Math.floor(paragraphs.length / 2)].substring(0, 200)}..."
          </blockquote>
        </div>
      )}
    </div>
  );
};

export default NewsContentSection;