// components/shop-by-manufacturer/hooks/useManufacturerCarImages.ts
import { useState, useEffect, useMemo } from 'react';
import { type Manufacturer } from '../../../../hooks/manufacturer/useManufacturers';

interface Car {
  manufacturer_name: string;
  main_image_url: string;
  created_at: string;
  [key: string]: any; // For any additional properties
}

interface UseManufacturerCarImagesProps {
  manufacturers: Manufacturer[] | undefined;
  allCars: Car[] | undefined;
  manufacturersLoading: boolean;
  carsLoading: boolean;
  maxItems: number;
}

export const useManufacturerCarImages = ({
  manufacturers,
  allCars,
  manufacturersLoading,
  carsLoading,
  maxItems
}: UseManufacturerCarImagesProps) => {
  const [manufacturerCarImages, setManufacturerCarImages] = useState<Record<string, string>>({});

  // Get unique manufacturer names
  const manufacturerNames = useMemo(() => {
    return (manufacturers || []).slice(0, maxItems).map(m => m.name);
  }, [manufacturers, maxItems]);

  // Process car images when manufacturers and cars are loaded
  useEffect(() => {
    if (!manufacturersLoading && !carsLoading && allCars && manufacturerNames.length > 0) {
      console.log('Processing car images for manufacturers:', manufacturerNames);
      console.log('Available cars:', allCars.length);
      
      const images: Record<string, string> = {};
      
      manufacturerNames.forEach(manufacturerName => {
        // Find cars for this manufacturer
        const manufacturerCars = allCars.filter(car => 
          car.manufacturer_name === manufacturerName && car.main_image_url
        );
        
        console.log(`${manufacturerName}: Found ${manufacturerCars.length} cars with images`);
        
        if (manufacturerCars.length > 0) {
          // Sort by created_at to get the latest
          const latestCar = manufacturerCars.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )[0];
          
          console.log(`${manufacturerName}: Latest car image URL:`, latestCar.main_image_url);
          images[manufacturerName] = latestCar.main_image_url;
        } else {
          console.log(`${manufacturerName}: No cars with images found`);
        }
      });
      
      console.log('Manufacturer car images:', images);
      setManufacturerCarImages(images);
    }
  }, [manufacturersLoading, carsLoading, allCars, manufacturerNames]);

  return {
    manufacturerCarImages
  };
};