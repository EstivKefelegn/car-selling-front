// hooks/useSingleData.ts
import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';
import { CanceledError, type AxiosRequestConfig } from 'axios';

const useSingleData = <T>(
  endpoint: string, 
  requestConfig?: AxiosRequestConfig, 
  deps?: any[], 
  config?: { onError: (error: any) => void; }
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    apiClient
      .get<T>(endpoint, { signal: controller.signal, ...requestConfig })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err?.message ?? 'Something went wrong');
        setLoading(false);
        if (config?.onError) {
          config.onError(err);
        }
      });

    return () => controller.abort();
  }, deps ?? []);

  return { data, error, loading };
};

export default useSingleData;