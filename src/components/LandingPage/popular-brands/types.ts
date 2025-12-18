// components/popular-brands/types.ts
import { type Manufacturer } from '../../../hooks/manufacturer/useManufacturers';

export interface PopularBrandsWithModelsProps {
  maxBrands?: number;
}

export interface BrandCardProps {
  brand: Manufacturer;
  isSelected: boolean;
  isDarkMode: boolean;
  onClick: (brandName: string) => void;
}

export interface ModelsPanelProps {
  brandName: string;
  models: string[];
  isDarkMode: boolean;
  onClose: () => void;
  onModelClick: (modelName: string, brandName: string) => void;
}

export interface BrandsListProps {
  brands: Manufacturer[];
  isDarkMode: boolean;
}