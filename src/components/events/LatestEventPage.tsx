// pages/LatestEventPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useLatestEvent from '../../hooks/events/useLatestEvent';
import { useTranslation } from 'react-i18next';

const LatestEventPage: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const { data: events, loading, error } = useLatestEvent();
  const { t } = useTranslation();
  
  // Get the first (and only) event
  const event = events && events.length > 0 ? events[0] : null;

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center px-4">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
            isDarkMode ? 'border-blue-400' : 'border-blue-600'
          }`}></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('latestEvent.loading')}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center max-w-md p-6 md:p-8">
          <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-red-900/30' : 'bg-red-100'
          }`}>
            <svg className="w-7 h-7 md:w-8 md:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className={`text-lg md:text-xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t('latestEvent.error.title')}
          </h2>
          <p className={`mb-6 text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
          >
            {t('latestEvent.error.button')}
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center max-w-md p-6 md:p-8">
          <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
          }`}>
            <svg className="w-7 h-7 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className={`text-lg md:text-xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t('latestEvent.noEvent.title')}
          </h2>
          <p className={`mb-6 text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('latestEvent.noEvent.message')}
          </p>
          <Link
            to="/"
            className="inline-block px-5 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
          >
            {t('latestEvent.noEvent.button')}
          </Link>
        </div>
      </div>
    );
  }

  // Format dates - consider using i18n for date formatting as well
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateMobile = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section - Responsive height */}
      <div className="relative h-[70vh] sm:h-[80vh] md:h-screen w-full overflow-hidden">
        {event.cover_image ? (
          <div className="absolute inset-0">
            <img
              src={event.cover_image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          </div>
        ) : (
          <div className={`absolute inset-0 ${
            isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-600 to-purple-600'
          }`}></div>
        )}
        
        {/* Event Info Overlay - Responsive padding */}
        <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
          <div className="max-w-7xl mx-auto w-full">
            {/* Badges - Mobile wrap */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 md:mb-8">
              <span className="px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm md:text-base font-medium">
                {event.event_type.replace('_', ' ')}
              </span>
              {event.is_featured && (
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 bg-yellow-500/90 backdrop-blur-sm rounded-full text-xs sm:text-sm md:text-base font-medium">
                  {t('latestEvent.hero.featured')}
                </span>
              )}
              {event.is_virtual && (
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 bg-purple-500/90 backdrop-blur-sm rounded-full text-xs sm:text-sm md:text-base font-medium">
                  {t('latestEvent.hero.virtual')}
                </span>
              )}
            </div>
            
            {/* Main Title - Responsive sizing */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
              {event.title}
            </h1>
            
            {/* Event Details - Stack on mobile */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
              <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg sm:rounded-xl w-full sm:w-auto">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="text-sm sm:text-base md:text-lg font-medium block sm:hidden">
                    {formatDateMobile(event.start_date)}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-medium hidden sm:block">
                    {formatDate(event.start_date)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg sm:rounded-xl w-full sm:w-auto">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm sm:text-base md:text-lg font-medium">
                  {formatTime(event.start_date)}
                  <span className="hidden sm:inline"> - {formatTime(event.end_date)}</span>
                  <span className="sm:hidden text-xs"> to {formatTime(event.end_date)}</span>
                </div>
              </div>
              
              {!event.is_virtual && event.venue_name && (
                <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg sm:rounded-xl w-full sm:w-auto">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm sm:text-base md:text-lg font-medium truncate">
                    {event.venue_name}
                  </span>
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm mb-1 md:mb-2 text-white/70">
              {t('latestEvent.hero.scroll')}
            </span>
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stylish Description Section - Responsive padding */}
      <div className="relative">
        {/* Decorative Elements */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'
        }`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className={`inline-block px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full mb-3 sm:mb-4 ${
              isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-600'
            }`}>
              <span className="font-semibold text-sm sm:text-base">{t('latestEvent.details.sectionTitle')}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t('latestEvent.details.about')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{t('latestEvent.details.gathering')}</span>
            </h2>
            <div className={`w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full ${
              isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'
            }`}></div>
          </div>

          {/* Event Description with Visual Elements - Stack on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* Left Column - Main Description */}
            <div className="lg:col-span-2">
              {event.description && (
                <div className={`mb-8 sm:mb-10 md:mb-12 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t('latestEvent.details.overview')}
                  </h3>
                  <div className={`text-base sm:text-lg md:text-xl leading-relaxed space-y-4 sm:space-y-6 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <p className="text-lg sm:text-xl md:text-2xl font-light italic border-l-2 sm:border-l-3 md:border-l-4 border-blue-500 pl-4 sm:pl-5 md:pl-6 py-1 sm:py-2">
                      "{event.description}"
                    </p>
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              {event.detailed_description && (
                <div className={`mb-8 sm:mb-10 md:mb-12 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t('latestEvent.details.expect')}
                  </h3>
                  <div className={`space-y-4 sm:space-y-6 md:space-y-8 text-base sm:text-lg leading-relaxed ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {event.detailed_description.split('\n\n').map((paragraph, index) => (
                      <div key={index} className="relative pl-6 sm:pl-7 md:pl-8">
                        <div className={`absolute left-0 top-2 sm:top-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                          isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
                        }`}></div>
                        <p className="mb-4 sm:mb-6 last:mb-0">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Stats - Grid on mobile */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200'
              }`}>
                <h4 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('latestEvent.details.highlights')}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {event.max_attendees || '∞'}
                    </div>
                    <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('latestEvent.details.maxCapacity')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      Free
                    </div>
                    <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('latestEvent.details.admission')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {event.current_attendees || 0}
                    </div>
                    <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('latestEvent.details.registered')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 ${
                      isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                    }`}>
                      {event.timezone || 'UTC'}
                    </div>
                    <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('latestEvent.cards.timezone')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Key Information - Stack on mobile */}
            <div className="space-y-6 sm:space-y-8">
              {/* Date & Time Card */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                    isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                  }`}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t('latestEvent.cards.dateTime')}
                  </h3>
                </div>
                <div className={`space-y-3 sm:space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div>
                    <div className="text-xs sm:text-sm opacity-75 mb-1">{t('latestEvent.cards.start')}</div>
                    <div className="text-sm sm:text-base md:text-lg font-semibold">{formatDate(event.start_date)}</div>
                    <div className="text-sm sm:text-base md:text-lg">{formatTime(event.start_date)}</div>
                  </div>
                  <div className="pt-3 sm:pt-4 border-t border-gray-700/30">
                    <div className="text-xs sm:text-sm opacity-75 mb-1">{t('latestEvent.cards.end')}</div>
                    <div className="text-sm sm:text-base md:text-lg font-semibold">{formatDate(event.end_date)}</div>
                    <div className="text-sm sm:text-base md:text-lg">{formatTime(event.end_date)}</div>
                  </div>
                </div>
              </div>

              {/* Location/Virtual Card */}
              <div className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                    isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                  }`}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                        event.is_virtual 
                          ? "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          : "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      } />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                        event.is_virtual 
                          ? "" 
                          : "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      } />
                    </svg>
                  </div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {event.is_virtual ? t('latestEvent.cards.virtualEvent') : t('latestEvent.cards.location')}
                  </h3>
                </div>
                <div className={`space-y-3 sm:space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {event.is_virtual ? (
                    <>
                      {event.virtual_platform && (
                        <div>
                          <div className="text-xs sm:text-sm opacity-75 mb-1">{t('latestEvent.cards.platform')}</div>
                          <div className="text-sm sm:text-base md:text-lg font-semibold">{event.virtual_platform}</div>
                        </div>
                      )}
                      {event.virtual_link && (
                        <a
                          href={event.virtual_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-block mt-3 sm:mt-4 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl font-medium transition-all hover:scale-105 text-sm sm:text-base w-full text-center ${
                            isDarkMode
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          }`}
                        >
                          {t('latestEvent.cards.joinVirtual')}
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      {event.venue_name && (
                        <div>
                          <div className="text-xs sm:text-sm opacity-75 mb-1">{t('latestEvent.cards.venue')}</div>
                          <div className="text-sm sm:text-base md:text-lg font-semibold">{event.venue_name}</div>
                        </div>
                      )}
                      {event.address && (
                        <div>
                          <div className="text-xs sm:text-sm opacity-75 mb-1">{t('latestEvent.cards.address')}</div>
                          <div className="text-sm sm:text-base md:text-lg">{event.address}</div>
                        </div>
                      )}
                      {(event.city || event.country) && (
                        <div>
                          <div className="text-xs sm:text-sm opacity-75 mb-1">{t('latestEvent.cards.location')}</div>
                          <div className="text-sm sm:text-base md:text-lg">{event.city && `${event.city}, `}{event.country}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className={`absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 ${
          isDarkMode 
            ? 'bg-gradient-to-t from-gray-900 to-transparent' 
            : 'bg-gradient-to-t from-gray-50 to-transparent'
        }`}></div>
      </div>
    </div>
  );
};

export default LatestEventPage;