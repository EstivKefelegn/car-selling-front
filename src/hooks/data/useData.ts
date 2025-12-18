import { useState, useEffect } from 'react';
import apiClient from '../../services/api-client';
import { CanceledError, type AxiosRequestConfig } from 'axios';

export type Response<T> = T[];

const useData = <T>(
endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[], p0?: { onError: (error: any) => void; }) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    apiClient
      .get<Response<T>>(endpoint, { signal: controller.signal, ...requestConfig })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err?.message ?? 'Something went wrong');
        setLoading(false);
      });

    return () => controller.abort();
  }, deps ?? []);

  return { data, setData, error, loading };
};

export default useData;
