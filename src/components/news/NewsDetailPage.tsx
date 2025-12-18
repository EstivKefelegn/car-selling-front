// pages/NewsDetailPage.tsx
import React, { useEffect } from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { useLatestNews } from '../../hooks/cars/useNews';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorMessage from '../../utils/ErrorMessage';
import { FaCalendar, FaUser, FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NewsDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkModeStore();
  const { data: newsArray, error, loading } = useLatestNews(1); // Only get the latest one

  // Get the latest news article
  const latestNews = newsArray && newsArray.length > 0 ? newsArray[0] : null;

  // Redirect to home if no news found after loading
  useEffect(() => {
    if (!loading && !latestNews && !error) {
      setTimeout(() => navigate('/'), 3000);
    }
  }, [loading, latestNews, error, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-12">
          <ErrorMessage 
            message="Failed to load latest news" 
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  if (!latestNews) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-12">
          <div className={`max-w-2xl mx-auto text-center p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No News Available
            </h2>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Redirecting to home page...
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getAuthorName = () => {
    const { first_name, last_name } = latestNews.author;
    if (first_name && last_name) {
      return `${first_name} ${last_name}`;
    }
    return latestNews.author.username;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: latestNews.title,
        text: latestNews.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation Bar */}
      <nav className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                latestNews.is_featured
                  ? isDarkMode 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-600'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-600'
              }`}>
                {latestNews.is_featured ? 'Featured' : 'Latest News'}
              </span>
              
              <button
                onClick={handleShare}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <FaShareAlt />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <article className={`max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Hero Image */}
          {latestNews.image && (
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={latestNews.image}
                alt={latestNews.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/1200x600/${
                    isDarkMode ? '374151/ffffff' : 'f3f4f6/374151'
                  }?text=News+Image`;
                }}
              />
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 md:p-8">
            {/* Date and Author */}
            <div className={`flex flex-wrap items-center justify-between mb-6 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-4 mb-3 md:mb-0">
                <div className="flex items-center">
                  <FaCalendar className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {latestNews.formatted_published_date}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <FaUser className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {getAuthorName()}
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {latestNews.title}
            </h1>

            {/* Excerpt */}
            <div className={`mb-8 p-4 border-l-4 rounded-r-lg ${
              isDarkMode 
                ? 'border-blue-500 bg-gray-700 text-gray-200' 
                : 'border-blue-400 bg-blue-50 text-gray-700'
            }`}>
              <p className="text-lg italic">{latestNews.excerpt}</p>
            </div>

            {/* Main Content */}
            <div className={`prose max-w-none ${
              isDarkMode 
                ? 'prose-invert text-gray-300' 
                : 'text-gray-700'
            }`}>
              {latestNews.description.split('\r\n\r\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Author Details */}
            <div className={`mt-12 pt-8 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className={`text-xl font-bold ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-600'
                  }`}>
                    {latestNews.author.first_name?.charAt(0) || latestNews.author.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {getAuthorName()}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {latestNews.author.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            This is the latest news article. Check back soon for more updates!
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewsDetailPage;