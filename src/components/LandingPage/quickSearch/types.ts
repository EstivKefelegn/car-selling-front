import type { Manufacturer } from '../../../hooks/useManufacturers';

export interface QuickManufacturerSearchesProps {
  title?: string;
  maxItems?: number;
  onManufacturerClick?: (manufacturer: Manufacturer) => void;
}

export interface ManufacturerCardProps {
  manufacturer: Manufacturer;
  isDarkMode: boolean;
  onClick: (manufacturer: Manufacturer) => void;
}

export interface ShowMoreButtonProps {
  showAll: boolean;
  isDarkMode: boolean;
  count: number;
  onClick: () => void;
}