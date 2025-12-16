// components/events/EventCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {type Event } from '../../hooks/useEvents';
import { useDarkModeStore } from '../../store/useDarkModeStore';

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, compact = false }) => {
  const { isDarkMode } = useDarkModeStore();
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
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

  // Determine event status
  const now = new Date();
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  
  const isUpcoming = startDate > now;
  const isOngoing = startDate <= now && endDate >= now;
  const isPast = endDate < now;
  
  const getStatusColor = () => {
    if (isOngoing) return 'bg-green-500 text-white';
    if (isUpcoming) return 'bg-blue-500 text-white';
    if (isPast) return 'bg-gray-500 text-white';
    return 'bg-gray-500 text-white';
  };
  
  const getStatusText = () => {
    if (isOngoing) return 'Live Now';
    if (isUpcoming) return 'Upcoming';
    if (isPast) return 'Past';
    return 'Scheduled';
  };

  // Calculate available spots
  const availableSpots = event.max_attendees ? event.max_attendees - event.current_attendees : null;
  const isSoldOut = availableSpots !== null && availableSpots <= 0;

  if (compact) {
    return (
      <div className={`group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      }`}>
        <Link to={`/events/${event.slug}`} className="block">
          {/* Image */}
          <div className="aspect-[16/9] relative overflow-hidden">
            {event.cover_image ? (
              <img
                src={event.cover_image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            {/* Status Badge */}
            <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
            
            {/* Featured Badge */}
            {event.is_featured && (
              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                isDarkMode ? 'bg-yellow-900/80 text-yellow-200' : 'bg-yellow-500 text-white'
              }`}>
                ⭐ Featured
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-4">
            {/* Date */}
            <div className={`text-xs mb-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatDate(event.start_date)}
              {event.end_date !== event.start_date && ` - ${formatDate(event.end_date)}`}
            </div>
            
            {/* Title */}
            <h3 className={`font-semibold mb-2 line-clamp-2 group-hover:text-blue-500 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {event.title}
            </h3>
            
            {/* Event Type & Location */}
            <div className="flex items-center justify-between">
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {event.event_type.replace('_', ' ')}
                {event.is_virtual && ' • Virtual'}
              </span>
              
              {/* Price */}
              <span className={`text-xs font-medium ${
                isDarkMode ? 'text-green-300' : 'text-green-600'
              }`}>
                {event.is_free ? 'FREE' : `$${event.price}`}
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className={`group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
      isDarkMode 
        ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
        : 'bg-white hover:bg-gray-50 border border-gray-200'
    }`}>
      <div className="flex flex-col lg:flex-row">
        {/* Event Image */}
        <div className="lg:w-2/5 xl:w-1/3 relative overflow-hidden">
          <div className="aspect-[4/3] lg:aspect-square lg:h-full relative">
            {event.cover_image ? (
              <img
                src={event.cover_image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            {/* Status Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
            
            {/* Featured Badge */}
            {event.is_featured && (
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode ? 'bg-yellow-900/80 text-yellow-200' : 'bg-yellow-500 text-white'
              }`}>
                ⭐ Featured
              </div>
            )}
            
            {/* Virtual/In-person Indicator */}
            {event.is_virtual && (
              <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode ? 'bg-purple-900/80 text-purple-200' : 'bg-purple-100 text-purple-800'
              }`}>
                🎥 Virtual Event
              </div>
            )}
            
            {/* Category Badge */}
            {event.category && (
              <div 
                className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-gray-900/80 text-gray-200' : 'bg-white/90 text-gray-800'
                }`}
                style={{ 
                  backgroundColor: event.is_virtual ? undefined : `${event.category.color}20`,
                  color: event.is_virtual ? undefined : event.category.color 
                }}
              >
                {event.category.name}
              </div>
            )}
          </div>
        </div>
        
        {/* Event Content */}
        <div className="lg:w-3/5 xl:w-2/3 p-6">
          <div className="flex flex-col h-full">
            {/* Date and Time */}
            <div className="mb-3">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {/* Date */}
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {formatDate(event.start_date)}
                    {event.end_date !== event.start_date && ` - ${formatDate(event.end_date)}`}
                  </span>
                </div>
                
                {/* Time */}
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {formatTime(event.start_date)} - {formatTime(event.end_date)}
                  </span>
                </div>
              </div>
              
              {/* Timezone */}
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Timezone: {event.timezone}
              </span>
            </div>
            
            {/* Title */}
            <h3 className={`text-xl lg:text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Link to={`/events/${event.slug}`}>
                {event.title}
              </Link>
            </h3>
            
            {/* Event Type */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}>
                {event.event_type.replace('_', ' ')}
              </span>
            </div>
            
            {/* Description */}
            <p className={`mb-4 line-clamp-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {event.description}
            </p>
            
            {/* Location/Virtual Info */}
            <div className="mb-6">
              <div className="flex items-start gap-2">
                <svg className={`w-5 h-5 mt-0.5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={event.is_virtual 
                      ? "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                      : "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={event.is_virtual 
                      ? "" 
                      : "M15 11a3 3 0 11-6 0 3 3 0 016 0z"}
                  />
                </svg>
                <div>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {event.is_virtual ? 'Virtual Event' : event.venue_name || 'Location TBA'}
                  </p>
                  {!event.is_virtual && event.address && (
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {event.address}
                      {event.city && `, ${event.city}`}
                      {event.state && `, ${event.state}`}
                      {event.country && `, ${event.country}`}
                    </p>
                  )}
                  {event.is_virtual && event.virtual_platform && (
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Platform: {event.virtual_platform}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bottom Section */}
            <div className="mt-auto pt-4 border-t border-gray-700 dark:border-gray-600">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left side: Price and Registration Info */}
                <div className="flex items-center gap-4">
                  {/* Price */}
                  <div className={`px-3 py-1.5 rounded-lg ${
                    event.is_free 
                      ? isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                      : isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <span className="text-sm font-medium">
                      {event.is_free ? 'FREE' : `$${event.price} ${event.currency}`}
                    </span>
                  </div>
                  
                  {/* Registration Status */}
                  <div className="hidden sm:block">
                    {isSoldOut ? (
                      <div className={`px-3 py-1.5 rounded-lg ${
                        isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                      }`}>
                        <span className="text-sm font-medium">Sold Out</span>
                      </div>
                    ) : event.registration_open ? (
                      <div className={`px-3 py-1.5 rounded-lg ${
                        isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                      }`}>
                        <span className="text-sm font-medium">Registration Open</span>
                      </div>
                    ) : (
                      <div className={`px-3 py-1.5 rounded-lg ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}>
                        <span className="text-sm font-medium">Registration Closed</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right side: Attendees and Action Button */}
                <div className="flex items-center gap-4">
                  {/* Attendee Count */}
                  {event.max_attendees && (
                    <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.0H14" />
                      </svg>
                      <div>
                        <span className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {event.current_attendees}
                        </span>
                        <span className={`mx-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>/</span>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {event.max_attendees}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Action Button */}
                  <Link
                    to={`/events/${event.slug}`}
                    className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      isSoldOut
                        ? isDarkMode
                          ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        : isDarkMode
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isSoldOut ? 'Sold Out' : 
                     event.registration_open ? 'Register Now' : 'View Details'}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Mobile-only Registration Status */}
              <div className="sm:hidden mt-3">
                {isSoldOut ? (
                  <div className={`px-3 py-1.5 rounded-lg text-center ${
                    isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                  }`}>
                    <span className="text-sm font-medium">Sold Out</span>
                  </div>
                ) : event.registration_open ? (
                  <div className={`px-3 py-1.5 rounded-lg text-center ${
                    isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                  }`}>
                    <span className="text-sm font-medium">Registration Open • {availableSpots} spots left</span>
                  </div>
                ) : (
                  <div className={`px-3 py-1.5 rounded-lg text-center ${
                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    <span className="text-sm font-medium">Registration Closed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;