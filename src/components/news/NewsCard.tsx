// components/NewsCard.tsx
import React from 'react';
import { type News } from '../../hooks/useNews';

interface NewsCardProps {
  news: News;  // Single News object, not News[]
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const displayDate = news.formatted_published_date || 
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const getAuthorInitials = () => {
    const { first_name, last_name } = news.author;
    if (first_name && last_name) {
      return `${first_name.charAt(0)}${last_name.charAt(0)}`;
    }
    return news.author.username.charAt(0).toUpperCase();
  };

  const getAuthorName = () => {
    const { first_name, last_name } = news.author;
    if (first_name && last_name) {
      return `${first_name} ${last_name}`;
    }
    return news.author.username;
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {news.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=News+Image';
            }}
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            news.is_featured 
              ? 'text-blue-600 bg-blue-100' 
              : 'text-gray-600 bg-gray-100'
          }`}>
            {news.is_featured ? 'Featured' : 'News'}
          </span>
          <time className="text-sm text-gray-500">{displayDate}</time>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {news.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {news.excerpt || news.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
              <span className="text-sm font-semibold text-gray-600">
                {getAuthorInitials()}
              </span>
            </div>
            <span className="text-sm text-gray-700">
              {getAuthorName()}
            </span>
          </div>
          
          <button 
            onClick={() => window.location.href = `/news/${news.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Read more →
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;