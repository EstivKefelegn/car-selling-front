// pages/NewsPage.tsx
import React from 'react';
import { useLatestNews } from '../../hooks/cars/useNews';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorMessage from '../../utils/ErrorMessage';
import NewsCard from './NewsCard';

const NewsPage: React.FC = () => {
  const { data: newsArray, error, loading } = useLatestNews(10);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load news" />;
  }

  // newsArray should be News[] (array of News objects)
  if (!newsArray || newsArray.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest News</h1>
          <p className="text-gray-600">No news articles found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest News</h1>
        <p className="text-gray-600 mb-8">Stay updated with our latest announcements and stories</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArray.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;