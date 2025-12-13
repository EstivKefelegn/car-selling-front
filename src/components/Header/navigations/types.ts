// components/navigation/types.ts
export interface Manufacturer {
  id: number;
  name: string;
  logo_url?: string;
  country: string;
  founded_year: number;
  is_ev_only: boolean;
}

export interface DropdownItem {
  id: number | string;
  name: string;
  link: string;
  icon?: string;
}

export type DropdownKey = 'buy' | 'newCars' | 'services' | 'more';

export interface MenuItem {
  name: string;
  hasDropdown: boolean;
  key: string;
  link?: string; 
}

export interface DropdownData {
  buy: DropdownItem[];
  newCars: DropdownItem[];
  services: DropdownItem[];
  more: DropdownItem[];
}