// utils/errorUtils.ts
export const extractErrorMessage = (error: any): string => {
  if (!error) return 'An unknown error occurred';
  
  // If it's already a string
  if (typeof error === 'string') return error;
  
  // If it's an AxiosError or similar
  if (error.response) {
    const data = error.response.data;
    
    // Handle Django REST Framework error format
    if (data?.detail) return data.detail;
    
    // Handle object with field errors
    if (typeof data === 'object') {
      // Check for common error formats
      if (data.message) return data.message;
      if (data.error) return data.error;
      if (data.non_field_errors) {
        return Array.isArray(data.non_field_errors) 
          ? data.non_field_errors.join(', ') 
          : data.non_field_errors;
      }
      
      // Try to extract first field error
      const fieldErrors = Object.keys(data)
        .filter(key => Array.isArray(data[key]) && data[key].length > 0)
        .map(key => `${key}: ${data[key].join(', ')}`);
      
      if (fieldErrors.length > 0) {
        return fieldErrors.join('; ');
      }
    }
    
    return `Request failed with status ${error.response.status}`;
  }
  
  // If it has a message property
  if (error.message) return error.message;
  
  // Fallback to string representation
  return String(error);
};