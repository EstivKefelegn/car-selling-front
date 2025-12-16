// hooks/useEvents.ts
import useData from "./useData";

export interface Event {
  zip_code: string;
  virtual_passcode: any;
  virtual_meeting_id: any;
  id: number;
  title: string;
  slug: string;
  description: string;
  detailed_description: string;
  event_type: string;
  category: EventCategory;
  tags: EventTag[];
  start_date: string;
  end_date: string;
  timezone: string;
  is_virtual: boolean;
  venue_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  virtual_platform: string;
  virtual_link: string;
  cover_image: string;
  banner_image: string;
  requires_registration: boolean;
  is_free: boolean;
  registration_link: string;
  max_attendees: number;
  current_attendees: number;
  price: string;
  currency: string;
  status: string;
  is_featured: boolean;
  is_private: boolean;
  organizer: Organizer;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  views: number;
  registration_open: boolean;
  seats_available: number;
  duration_days: number;
  registration_count: number;
  speakers: EventSpeaker[];
  schedules: EventSchedule[];
  gallery: EventImage[];
}

export interface EventCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export interface EventTag {
  id: number;
  name: string;
  slug: string;
}

export interface EventSpeaker {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  photo: string;
  twitter: string;
  linkedin: string;
  website: string;
  display_order: number;
}

export interface EventSchedule {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  title: string;
  description: string;
  location: string;
  speakers: EventSpeaker[];
}

export interface EventImage {
  id: number;
  image: string;
  caption: string;
  alt_text: string;
  display_order: number;
}

export interface Organizer {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface EventQuery {
  status_filter?: 'upcoming' | 'ongoing' | 'past' | 'all';
  event_type?: string;
  category?: string;
  is_virtual?: boolean;
  is_featured?: boolean;
  search?: string;
  ordering?: string;
  limit?: number;
  page?: number;
}

// Helper function to create stable query params object
const createQueryParams = (eventQuery?: EventQuery) => {
  if (!eventQuery) return {};
  
  return {
    status: eventQuery.status_filter || 'upcoming',
    ...(eventQuery.event_type && { event_type: eventQuery.event_type }),
    ...(eventQuery.category && { category: eventQuery.category }),
    ...(eventQuery.is_virtual !== undefined && { is_virtual: eventQuery.is_virtual }),
    ...(eventQuery.is_featured !== undefined && { is_featured: eventQuery.is_featured }),
    ...(eventQuery.search && { search: eventQuery.search }),
    ordering: eventQuery.ordering || 'start_date',
    limit: eventQuery.limit || 10,
    page: eventQuery.page || 1
  };
};

// Create stable dependency array to prevent infinite re-renders
const createDepsArray = (eventQuery?: EventQuery) => {
  if (!eventQuery) return [];
  
  return [
    eventQuery.status_filter,
    eventQuery.event_type,
    eventQuery.category,
    eventQuery.is_virtual,
    eventQuery.is_featured,
    eventQuery.search,
    eventQuery.ordering,
    eventQuery.limit,
    eventQuery.page
  ];
};

const useEvents = (eventQuery?: EventQuery) => {
  const queryParams = createQueryParams(eventQuery);
  const deps = createDepsArray(eventQuery);
  
  return useData<Event>(
    "/company/events/",
    {
      params: queryParams
    },
    deps
  );
};

export default useEvents;

// Hook for event categories
export const useEventCategories = () => 
  useData<EventCategory>(
    "/company/categories/",
    {},
    [] // Empty array means fetch once on mount
  );

// For featured events
export const useFeaturedEvents = (limit: number = 3) => {
  const deps = [limit];
  
  return useData<Event>(
    "/company/events/",
    {
      params: {
        is_featured: true,
        status: 'upcoming',
        limit: limit,
        ordering: 'start_date'
      }
    },
    deps
  );
};