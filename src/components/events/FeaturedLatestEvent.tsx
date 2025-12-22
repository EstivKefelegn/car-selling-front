// components/FeaturedLatestEvent.tsx - Updated with fixed Event Highlights card
import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useLatestEvent from '../../hooks/events/useLatestEvent';

const FeaturedLatestEvent: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const { data: events, loading, error } = useLatestEvent();
  
  // Get the first (and only) event
  const event = events && events.length > 0 ? events[0] : null;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className={`min-h-[60vh] md:h-[80vh] flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center px-4">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
            isDarkMode ? 'border-blue-400' : 'border-blue-600'
          }`}></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading featured event...
          </p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return null; // Don't show anything if there's an error or no event
  }

  return (
    <div className="py-6 md:py-12">
      {/* Title Section - Mobile Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          <div className="w-full">
            <div className="inline-block mb-2 md:mb-3">
              <span className={`text-xs md:text-sm uppercase tracking-widest font-semibold ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Community Spotlight
              </span>
              <div className={`w-full h-0.5 mt-1 rounded-full ${
                isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'
              }`}></div>
            </div>
            
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Featured Event
              </span>
            </h2>
            
            <p className={`text-sm sm:text-base md:text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } max-w-2xl mb-4 md:mb-0`}>
              Join our exclusive EV community gathering
            </p>
          </div>
          

        </div>
      </div>

      {/* Event Card - Mobile Responsive */}
      <Link to="/events" className="block group">
        {/* Hero Section - Responsive width and height */}
        <div className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] w-[95%] sm:w-[92%] md:w-[90%] mx-auto overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-xl sm:hover:shadow-2xl md:hover:shadow-3xl transition-all duration-500">
          {/* Background Image */}
          {event.cover_image ? (
            <div className="absolute inset-0">
              <img
                src={event.cover_image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            </div>
          ) : (
            <div className={`absolute inset-0 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
                : 'bg-gradient-to-br from-blue-600 to-purple-700'
            }`}></div>
          )}
          
          {/* Content Container - Mobile Stacking */}
          <div className="relative z-10 h-full flex items-end md:items-center px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
            <div className="w-full">
              {/* Mobile Layout - Stacked */}
              <div className="flex flex-col gap-4 md:gap-8">
                {/* Main Content - Top on mobile */}
                <div className="flex-1">
                  {/* Badges - Wrap on mobile */}
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    <span className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm ${
                      isDarkMode 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white/20 text-white'
                    }`}>
                      {event.event_type.replace('_', ' ')}
                    </span>
                    {event.is_featured && (
                      <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-yellow-500/90 text-white backdrop-blur-sm">
                        ⭐ Featured
                      </span>
                    )}
                    {event.is_virtual && (
                      <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-purple-500/90 text-white backdrop-blur-sm">
                        🎥 Virtual
                      </span>
                    )}
                  </div>

                  {/* Event Title - Smaller on mobile */}
                  <div className="mb-4 md:mb-6">
                    {/* Main Title */}
                    <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-4 ${
                      isDarkMode ? 'text-white' : 'text-white'
                    }`}>
                      {event.title}
                    </h1>
                    
                    {/* Event Tagline - Hidden on small mobile */}
                    <p className={`hidden sm:block text-lg md:text-xl font-light ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-200'
                    }`}>
                      Experience the future of electric mobility
                    </p>
                  </div>

                  {/* Event Details - Compact on mobile */}
                  <div className={`mb-4 md:mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                    {event.description && (
                      <p className="text-sm sm:text-base md:text-lg mb-4 opacity-90 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 md:space-y-3">
                      {/* Date & Time - Stacked on mobile */}
                      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl w-fit">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm sm:text-base font-medium">{formatDate(event.start_date)}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl w-fit">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm sm:text-base">{formatTime(event.start_date)}</span>
                        </div>
                      </div>

                      {/* Location/Virtual */}
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl w-fit">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                            event.is_virtual 
                              ? "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              : "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          } />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                            event.is_virtual 
                              ? "" 
                              : "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          } />
                        </svg>
                        <span className="text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">
                          {event.is_virtual ? 'Virtual Event' : event.venue_name || event.city || 'Location TBD'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button - Full width on mobile */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <div className="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white text-gray-900 rounded-lg sm:rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <span className="text-sm sm:text-base">View Event</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'} text-center sm:text-left`}>
                      Tap to explore
                    </span>
                  </div>
                </div>

                {/* Quick Stats Sidebar - Fixed positioning */}
                <div className={`mt-4 md:mt-0 w-full md:w-72 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-white/10 border-white/20'
                } shadow-lg md:absolute md:right-4 lg:right-6 xl:right-8 md:bottom-4 lg:bottom-6 xl:bottom-8`}>
                  <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
                    isDarkMode ? 'text-white' : 'text-white'
                  }`}>
                    Event Highlights
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-6">
                    {event.max_attendees && (
                      <div className="pb-3 sm:pb-4 border-b border-white/20">
                        <div className={`text-xl sm:text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                          {event.max_attendees}
                        </div>
                        <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                          Available Spots
                        </div>
                      </div>
                    )}
                    
                    <div className="pb-3 sm:pb-4 border-b border-white/20">
                      <div className={`text-xl sm:text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                        Free
                      </div>
                      <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                        Admission
                      </div>
                    </div>
                    
                    {event.timezone && (
                      <div className="pb-3 sm:pb-4 border-b border-white/20">
                        <div className={`text-base sm:text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                          {event.timezone}
                        </div>
                        <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                          Timezone
                        </div>
                      </div>
                    )}
                    
                    <div className="col-span-2 sm:col-span-1">
                      <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Open to all EV enthusiasts</span>
                        </div>
                        <div className="text-xs opacity-75 hidden sm:block">
                          Networking • Demos • Community
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent md:hidden"></div>
          
          {/* Decorative Corner Accents - Hidden on mobile */}
          <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-white/30 rounded-tl-xl sm:rounded-tl-2xl md:rounded-tl-3xl hidden sm:block"></div>
          <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-r-2 border-white/30 rounded-tr-xl sm:rounded-tr-2xl md:rounded-tr-3xl hidden sm:block"></div>
          
          {/* Bottom Gradient Fade - Desktop */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl hidden md:block"></div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedLatestEvent;