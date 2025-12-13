// components/shop-by-manufacturer/utils/imageUrlBuilder.ts
export const buildImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with /, it's probably a relative path from backend
  if (imagePath.startsWith('/')) {
    const backendUrl = 'http://localhost:8000';
    return `${backendUrl}${imagePath}`;
  }
  
  // Otherwise, assume it's a relative path
  return imagePath;
};