// components/shop-by-manufacturer/utils/imageUrlBuilder.ts
import apiClient from "../../../../services/api-client";

export const buildImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with /, it's probably a relative path from backend
  if (imagePath.startsWith('/')) {
    return `${apiClient}${imagePath}`;
  }
  
  // Otherwise, assume it's a relative path
  return imagePath;
};