// components/popular-brands/hooks/useBrandModels.ts
import { useMemo } from 'react';
import { type Manufacturer } from '../../../../hooks/manufacturer/useManufacturers';

interface UseBrandModelsProps {
  allCars: any[] | undefined;
  manufacturersList: Manufacturer[] | undefined;
}

export const useBrandModels = ({ allCars, manufacturersList }: UseBrandModelsProps) => {
  const brandModels = useMemo(() => {
    if (!allCars || !manufacturersList) return {};

    const models: Record<string, string[]> = {};
    
    manufacturersList.forEach(brand => {
      // Filter cars for this brand
      const brandCars = allCars.filter(car => 
        car.manufacturer_name === brand.name && car.model_name
      );
      
      // Get unique model names for this brand
      const uniqueModels = Array.from(
        new Set(brandCars.map(car => car.model_name).filter(Boolean))
      ) as string[];
      
      models[brand.name] = uniqueModels.length > 0 ? uniqueModels : ['No models found'];
    });
    
    return models;
  }, [allCars, manufacturersList]);

  return { brandModels };
};