// hooks/serviceBooking/useServiceBooking.ts
import { useState } from 'react';
import apiClient from '../../services/api-client';
import { type Car } from '../cars/useEVCars'; // Import your Car type

export interface ServiceBooking {
  id?: number;
  vehicle: number | null; // Required - must be a Car ID
  service_type: string | null;
  service_type_custom?: string;
  preferred_date?: string | null;
  preferred_time_slot?: string | null;
  alternative_dates?: string | null;
  odometer_reading?: number | null;
  service_description?: string;
  symptoms_problems?: string;
  customer_notes?: string;
  full_name: string;
  email: string;
  phone: string;
}

export const SERVICE_TYPE_CHOICES = [
  { value: 'neta_warranty', label: 'NETA 2-Year Warranty Service' },
  { value: '10000km_service', label: '10,000 KM Service' },
];

export interface ServiceType {
  value: string;
  label: string;
}

// Simple error message extraction
const extractErrorMessage = (error: any): string => {
  console.log('Error details:', error);
  
  if (!error) return 'An unknown error occurred';
  
  if (typeof error === 'string') return error;
  
  if (error.response?.data) {
    const data = error.response.data;
    
    if (data.detail) return data.detail;
    
    // Handle field validation errors
    if (typeof data === 'object') {
      const messages: string[] = [];
      Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
          messages.push(`${key}: ${data[key].join(', ')}`);
        } else if (typeof data[key] === 'string') {
          messages.push(`${key}: ${data[key]}`);
        }
      });
      if (messages.length > 0) return messages.join('; ');
    }
    
    return `Validation error: ${error.response.status}`;
  }
  
  if (error.message) return error.message;
  
  return String(error);
};

const useServiceBookings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const getServiceTypes = async () => {
    try {
      return SERVICE_TYPE_CHOICES;
    } catch (err: any) {
      const errorMsg = extractErrorMessage(err);
      setError(errorMsg);
      throw err;
    }
  };

  const createServiceBooking = async (bookingData: ServiceBooking) => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Creating booking with data:', bookingData);
      
      // Clean up the data before sending
      const cleanedData: any = {
        vehicle: bookingData.vehicle, // Required field
        service_type: bookingData.service_type,
        full_name: bookingData.full_name,
        email: bookingData.email,
        phone: bookingData.phone,
      };
      
      // Only include custom service type if provided
      if (bookingData.service_type_custom) {
        cleanedData.service_type_custom = bookingData.service_type_custom;
      }
      
      // Handle date fields - don't send if empty
      if (bookingData.preferred_date) {
        cleanedData.preferred_date = bookingData.preferred_date;
      }
      
      // Handle time slot - don't send if empty
      if (bookingData.preferred_time_slot && bookingData.preferred_time_slot !== '') {
        cleanedData.preferred_time_slot = bookingData.preferred_time_slot;
      }
      
      // Handle alternative dates - send empty string instead of null if not provided
      cleanedData.alternative_dates = bookingData.alternative_dates || '';
      
      // Handle conditional fields
      if (bookingData.service_type === '10000km_service' && bookingData.odometer_reading) {
        cleanedData.odometer_reading = bookingData.odometer_reading;
      } else {
        // Send 0 instead of null for non-warranty services
        cleanedData.odometer_reading = 0;
      }
      
      if (bookingData.service_type === 'neta_warranty' && bookingData.service_description) {
        cleanedData.service_description = bookingData.service_description;
      } else {
        cleanedData.service_description = '';
      }
      
      // Optional fields - send empty string if not provided
      cleanedData.symptoms_problems = bookingData.symptoms_problems || '';
      cleanedData.customer_notes = bookingData.customer_notes || '';
      
      console.log('Cleaned booking data:', cleanedData);
      
      const response = await apiClient.post('/cars/public/book-service/', cleanedData);
      
      console.log('Booking created successfully:', response.data);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      console.error('Failed to create booking:', err);
      const errorMsg = extractErrorMessage(err);
      console.log('Error message:', errorMsg);
      setError(errorMsg);
      setLoading(false);
      throw err;
    }
  };

  return {
    createServiceBooking,
    getServiceTypes,
    loading,
    error,
    clearError: () => setError('')
  };
};

export default useServiceBookings;