// pages/LatestEventPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useLatestEvent from '../../hooks/events/useLatestEvent';
import FindCarsButton from '../../utils/FindCars';

const LatestEventPage: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const { data: events, loading, error } = useLatestEvent();
  
  // Get the first (and only) event
  const event = events && events.length > 0 ? events[0] : null;

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
            isDarkMode ? 'border-blue-400' : 'border-blue-600'
          }`}></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading latest event...
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
        <div className="text-center max-w-md p-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-red-900/30' : 'bg-red-100'
          }`}>
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className={`text-xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Unable to load event
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
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
        <div className="text-center max-w-md p-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
          }`}>
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className={`text-xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            No upcoming events
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Check back soon for our next event!
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section with Event Image */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {event.cover_image ? (
          <img
            src={event.cover_image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full ${
            isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-600 to-purple-600'
          }`}></div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        
        {/* Event Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mr-3">
                {event.event_type.replace('_', ' ')}
              </span>
              {event.is_featured && (
                <span className="inline-block px-5 py-2 bg-yellow-500/90 backdrop-blur-sm rounded-full text-sm font-medium">
                  ⭐ Featured Event
                </span>
              )}
              {event.is_virtual && (
                <span className="inline-block px-5 py-2 bg-purple-500/90 backdrop-blur-sm rounded-full text-sm font-medium ml-3">
                  🎥 Virtual Event
                </span>
              )}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-lg font-medium">{formatDate(event.start_date)}</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-medium">{formatTime(event.start_date)} - {formatTime(event.end_date)}</span>
              </div>
              
              {!event.is_virtual && event.venue_name && (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg font-medium">{event.venue_name}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4">
              {event.registration_open && (
                <div className="flex items-center gap-4">
                  <FindCarsButton isDark={false} text='Find Your Perfect Car'/>
                  <Link
                    to="/events"
                    className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/20 transition-colors text-lg"
                  >
                    View All Events
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Description Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Short Description */}
        {event.description && (
          <div className={`mb-12 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Event Overview
            </h2>
            <p className="text-xl leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        {/* Detailed Description */}
        {event.detailed_description && (
          <div className={`mb-12 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Event Details
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              {event.detailed_description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Key Information Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {/* Date & Time */}
          <div className={`p-6 rounded-2xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              📅 Date & Time
            </h3>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Start:</span> {formatDate(event.start_date)} at {formatTime(event.start_date)}
              </p>
              <p className="text-lg">
                <span className="font-semibold">End:</span> {formatDate(event.end_date)} at {formatTime(event.end_date)}
              </p>
              <p className="text-sm opacity-75">
                Timezone: {event.timezone}
              </p>
            </div>
          </div>

          {/* Location/Virtual */}
          <div className={`p-6 rounded-2xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {event.is_virtual ? '💻 Virtual Event' : '📍 Location'}
            </h3>
            <div className="space-y-2">
              {event.is_virtual ? (
                <>
                  {event.virtual_platform && (
                    <p className="text-lg">
                      <span className="font-semibold">Platform:</span> {event.virtual_platform}
                    </p>
                  )}
                  {event.virtual_link && (
                    <a
                      href={event.virtual_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block mt-2 px-4 py-2 rounded-lg font-medium ${
                        isDarkMode
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      Join Virtual Event
                    </a>
                  )}
                </>
              ) : (
                <>
                  {event.venue_name && (
                    <p className="text-lg">
                      <span className="font-semibold">Venue:</span> {event.venue_name}
                    </p>
                  )}
                  {event.address && (
                    <p className="text-lg">
                      <span className="font-semibold">Address:</span> {event.address}
                    </p>
                  )}
                  {(event.city || event.country) && (
                    <p className="text-lg">
                      {event.city && `${event.city}, `}{event.country}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Registration Section */}
        <div className="text-center">
          <div className={`p-8 rounded-2xl mb-8 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {event.registration_open ? 'Ready to Join?' : 'Registration Status'}
            </h3>
            
            {event.registration_open ? (
              <div className="space-y-4">
                <p className={`text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {event.requires_registration 
                    ? 'Secure your spot by registering now!' 
                    : 'Join us for this exciting event!'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <FindCarsButton 
                    isDark={isDarkMode} 
                    text={event.requires_registration ? 'Register Now' : 'Join Event'}
                  />
                  
                  {event.max_attendees && (
                    <div className={`px-6 py-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {event.current_attendees} of {event.max_attendees} spots filled
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className={`text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Registration for this event is currently closed.
                </p>
                <Link
                  to="/events"
                  className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg"
                >
                  View Other Events
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestEventPage;