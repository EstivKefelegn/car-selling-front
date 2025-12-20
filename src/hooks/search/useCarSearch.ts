// hooks/useCarSearch.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../../services/api-client';


const useCarSearch = (searchQuery: string = '', filters: any = {}) => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        
        // If search query exists, use search endpoint
        if (searchQuery.trim()) {
          const searchResponse = await axios.get(
            `${apiClient}/cars/search/?q=${encodeURIComponent(searchQuery)}`
          );
          setCars(searchResponse.data);
        } 
        // Otherwise, use regular cars endpoint with filters if needed
        else {
          // Build query parameters from filters
          const params = new URLSearchParams();
          
          if (filters.minPrice) params.append('min_price', filters.minPrice);
          if (filters.maxPrice) params.append('max_price', filters.maxPrice);
          if (filters.bodyType) params.append('body_type', filters.bodyType);
          // Add other filters as needed
          
          const response = await axios.get(
            `${apiClient}/cars/?${params.toString()}`
          );
          setCars(response.data);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch cars');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, filters]); // Re-fetch when search or filters change

  return { cars, loading, error };
};

export default useCarSearch;