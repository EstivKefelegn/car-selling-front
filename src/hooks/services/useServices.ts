// hooks/useServices.ts
import { useState } from 'react';
import apiClient from '../../services/api-client';

// Types
interface ServiceCategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  icon_color: string;
  service_count: number;
}

interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: ServiceCategory | null;
  service_type: string;
  price: number | null;
  price_display: string;
  duration_value: number;
  duration_unit: string;
  display_duration: string;
  is_special_offer: boolean;
  special_offer_text: string;
  is_current_special: boolean;
  days_remaining: number | null;
  eligibility_description: string;
  is_neta_battery_warranty: boolean;
  is_first_round_service: boolean;
  features: string[];
  service_center_required: boolean;
  mobile_service_available: boolean;
  appointment_required: boolean;
  estimated_service_time: string;
  warranty_coverage: string;
  featured_image: string;
  is_featured: boolean;
}

interface ServiceTestimonial {
  id: number;
  customer_name: string;
  customer_vehicle: string;
  testimonial: string;
  rating: number;
  rating_display: string;
  customer_location: string;
  service_date: string;
  is_verified: boolean;
  featured_image: string;
}

interface ServiceFAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  category_display: string;
}

interface ServiceCenter {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  latitude: number | null;
  longitude: number | null;
  opening_hours: Record<string, string>;
  has_ev_charging: boolean;
  has_waiting_lounge: boolean;
  has_loaner_cars: boolean;
  has_mobile_service: boolean;
  is_main_center: boolean;
}

interface ServicesData {
  categories: ServiceCategory[];
  services: Service[];
  testimonials: ServiceTestimonial[];
  faqs: ServiceFAQ[];
  serviceCenters: ServiceCenter[];
}

interface UseServicesReturn {
  servicesData: ServicesData;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const useServices = (): UseServicesReturn => {
  const [servicesData, setServicesData] = useState<ServicesData>({
    categories: [],
    services: [],
    testimonials: [],
    faqs: [],
    serviceCenters: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServicesData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [categoriesRes, servicesRes, testimonialsRes, faqsRes, centersRes] = await Promise.all([
        apiClient.get('/company/service-categories/'),
        apiClient.get('/company/services/'),
        apiClient.get('/company/service-testimonials/'),
        apiClient.get('/company/service-faqs/'),
        apiClient.get('/company/service-centers/')
      ]);

      setServicesData({
        categories: categoriesRes.data || [],
        services: servicesRes.data || [],
        testimonials: testimonialsRes.data || [],
        faqs: faqsRes.data || [],
        serviceCenters: centersRes.data || []
      });
      
      setLoading(false);
      
    } catch (err: any) {
      console.error('Services data fetch error:', err);
      setError(err?.message || 'Failed to load services data');
      setLoading(false);
    }
  };

    // Get services for specific car
    // const getServicesForCar = async (carId: number) => {
    //   try {
    //     const response = await apiClient.get(`/company/services/for-electric-car/?car_id=${carId}`);
    //     return { success: true, data: response.data };
    //   } catch (err: any) {
    //     return { 
    //       success: false, 
    //       error: err?.response?.data || err?.message 
    //     };
    //   }
    // };

    // // Get NETA services
    // const getNETAServices = async () => {
    //   try {
    //     const response = await apiClient.get('/company/services/neta-services/');
    //     return { success: true, data: response.data };
    //   } catch (err: any) {
    //     return { 
    //       success: false, 
    //       error: err?.response?.data || err?.message 
    //     };
    //   }
    // };

    // // Get first round services
    // const getFirstRoundServices = async () => {
    //   try {
    //     const response = await apiClient.get('/company/services/first-round-services/');
    //     return { success: true, data: response.data };
    //   } catch (err: any) {
    //     return { 
    //       success: false, 
    //       error: err?.response?.data || err?.message 
    //     };
    //   }
    // };

    // useEffect(() => {
    //   fetchServicesData();
    // }, []);

    return {
      servicesData,
      loading,
      error,
      refresh: fetchServicesData
    };
  };

  export default useServices;