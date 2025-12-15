// types/about.ts
export interface AboutUsData {
  dealership_name: string;
  tagline: string;
  description: string;
  logo_url?: string;
  full_address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  phone_number: string;
  secondary_phone?: string;
  email: string;
  support_email?: string;
  website?: string;
  business_hours: Array<{
    day: string;
    open_time: string;
    close_time: string;
    is_open: boolean;
  }>;
  social_media_links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  
  mission_statement?: string;
  vision_statement?: string;
  core_values?: string;
  history?: string;
  services_offered?: string;
  brands_carried?: string;
}

export interface TeamMember {
  id: number;
  full_name: string;
  position: string;
  display_position: string;
  bio: string;
  photo_url?: string;
  email?: string;
  phone?: string;
  years_experience: number;
}

export interface DealershipPhoto {
  id: number;
  photo_url: string;
  thumbnail_url: string;
  caption: string;
  photo_type: string;
}