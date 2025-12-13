// components/shop-by-manufacturer/types.ts
import { type Manufacturer } from '../../..//hooks/useManufacturers';

export interface ShopByManufacturerProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
}

export interface ManufacturerCardProps {
  manufacturer: Manufacturer;
  carImage: string | null;
  isDarkMode: boolean;
}

export interface ScrollControlsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  isDarkMode: boolean;
}

export interface SectionTitleProps {
  title: string;
  subtitle: string;
  isDarkMode: boolean;
}