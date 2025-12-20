import apiClient from "../services/api-client";

export const buildImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Prepend backend baseURL from apiClient
  const backendUrl = apiClient.defaults.baseURL || '';
  return `${backendUrl}${imagePath}`;
};
