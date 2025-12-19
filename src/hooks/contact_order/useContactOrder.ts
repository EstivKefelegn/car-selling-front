import { useState } from 'react';
import apiClient from '../../services/api-client';

export interface ContactOrderData {
  full_name: string;
  phone_number: string;
  electric_car_id: number;
  message?: string;
  preferred_contact_time: string;
}

export interface ContactOrderResponse {
  id: number;
  full_name: string;
  phone_number: string;
  electric_car_display_name: string;
  message: string;
  preferred_contact_time: string;
  status: string;
  created_at: string;
}

const useContactOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitContactOrder = async (data: ContactOrderData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiClient.post<ContactOrderResponse>(
        '/cars/contact-orders/',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      let errorMessage = 'Failed to submit contact request';
      
      if (err.response?.data) {
        // Handle Django validation errors
        const data = err.response.data;
        if (typeof data === 'object') {
          // Combine all field errors
          const fieldErrors = Object.values(data).flat();
          errorMessage = Array.isArray(fieldErrors) 
            ? fieldErrors.join(', ')
            : String(fieldErrors);
        } else {
          errorMessage = data || errorMessage;
        }
      } else if (err.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    submitContactOrder,
    loading,
    error,
    success,
    reset
  };
};

export default useContactOrder;