import { useState, useEffect } from 'react';

interface CarColor {
  id: number;
  name: string;
  hex_code: string;
}

interface Car {
  id: number;
  manufacturer_name: string;
  manufacturer_logo: string;
  model_name: string;
  variant: string;
  model_year: number;
  category: string;
  category_display: string;
  base_price: string;
  base_price_value: number | null;
  range_wltp: number;
  motor_power: number;
  acceleration_0_100: number;
  efficiency: number;
  total_configurations: number;
  status_display: string;
  featured: boolean;
  main_image_url: string;
  available_exterior_colors: CarColor[];
  available_interior_colors: CarColor[];
}

interface UseAvailableCarsResult {
  status: Car[] | null;
  loading: boolean;
  error: string | null;
}

const useAvailableCars = (): UseAvailableCarsResult => {
  const [status, setStatus] = useState<Car[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/cars/available');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch cars: ${response.status}`);
        }
        
        const data = await response.json();
        setStatus(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { status, loading, error };
};

export default useAvailableCars;