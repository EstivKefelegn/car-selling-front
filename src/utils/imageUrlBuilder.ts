// components/featured-cars/utils/imageUrlBuilder.ts
export const buildImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Otherwise, prepend backend URL (adjust as needed)
  const backendUrl = 'http://localhost:8000';
  return `${backendUrl}${imagePath}`;
};