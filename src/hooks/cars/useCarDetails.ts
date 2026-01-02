// hooks/useCarDetails.ts
import { useMemo } from "react";
// import useData from "../data/useData";
import useSingleData from "../data/useSingleData";

export interface CarDetail {
  id: number;
  slug: string;
  manufacturer_details: {
    id: number;
    name: string;
    country: string;
    founded_year: number;
    is_ev_only: boolean;
    description: string;
    logo: string;
    logo_url: string;
    website: string;
    headquarters: string;
  };
  model_name: string;
  variant: string;
  model_year: number;
  category: string;
  category_display: string;
  status: string;
  status_display: string;
  featured: boolean;
  battery_capacity: string;
  usable_battery: string;
  battery_type: string;
  battery_type_display: string;
  battery_warranty_years: number;
  battery_warranty_km: number;
  range_wltp: number;
  range_epa: number;
  energy_consumption: number | null;
  acceleration_0_100: string;
  top_speed: number;
  motor_power: number;
  torque: number;
  drive_type: string;
  drive_type_display: string;
  max_dc_charging: number;
  max_ac_charging: number;
  charging_type: string;
  charging_type_display: string;
  charging_time_10_80: number;
  charging_time_0_100_ac: number | null;
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  curb_weight: number;
  cargo_capacity: number;
  seating_capacity: number;
  available_exterior_colors: Color[];
  available_interior_colors: Color[];
  has_heat_pump: boolean;
  has_battery_preconditioning: boolean;
  has_v2l: boolean;
  has_v2g: boolean;
  has_one_pedal_driving: boolean;
  regen_braking_levels: number;
  autopilot_level: string;
  autopilot_level_display: string;
  charging_port_location: string;
  charging_port_location_display: string;
  base_price: string;
  estimated_delivery: string;
  tax_incentive: boolean;
  main_image: string;
  main_image_url: string;
  brochure: string | null;
  brochure_url: string | null;
  description: string;
  key_features: string;
  safety_features: string;
  efficiency: number;
  charging_speed: number;
  is_available_for_sale: boolean;
  total_configurations: number;
  color_images: ColorImage[];
  color_configurations: any[];
  created_at: string;
  updated_at: string;
  created_by: number;
  color_gallery: {
    exterior_colors: ColorGalleryItem[];
    interior_colors: ColorGalleryItem[];
  };
}

export interface Color {
  id: number;
  name: string;
  hex_code: string;
  color_type: 'exterior' | 'interior';
  color_type_display: string;
  image: string | null;
  image_url: string | null;
  description: string;
}

export interface ColorImage {
  id: number;
  image: string;
  image_url: string;
  image_type: 'exterior' | 'interior';
  is_primary: boolean;
  order: number;
}

export interface ColorGalleryItem {
  color: Color;
  images: ColorImage[];
}



const useCarDetails = (carSlug: string) => {
  const endpoint = useMemo(() => `/cars/electric-cars/${carSlug}/`, [carSlug]);

  return useSingleData<CarDetail>(endpoint, {}, [endpoint], {
    onError: (error: any) => {
      console.error("Failed to fetch car details. Possible reasons:");
      console.error("- Network issue or server unreachable");
      console.error("- Car with slug not found:", carSlug);
      console.error("- Server returned an error:", error?.message || error);
    }
  });
};

export default useCarDetails;