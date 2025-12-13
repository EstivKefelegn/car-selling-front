export const formatPrice = (price: number): string => {
  if (!price && price !== 0) return 'N/A';
  if (price >= 10000000) {
    return `${(price / 1000000).toFixed(0)}M`;
  } else if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 100000) {
    return `${(price / 1000).toFixed(0)}K`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(1)}K`;
  }
  return price.toLocaleString();
};

export const filterCars = (cars: any[], filters: any) => {
  if (!cars) return [];
  
  return cars.filter(car => {
    if (Object.keys(filters).length === 0) return true;
    
    if (filters.manufacturer && car.manufacturer_name !== filters.manufacturer) {
      return false;
    }
    
    if (filters.model && car.model_name !== filters.model) {
      return false;
    }
    
    if (filters.minYear && car.model_year < Number(filters.minYear)) {
      return false;
    }
    if (filters.maxYear && car.model_year > Number(filters.maxYear)) {
      return false;
    }
    
    const carPriceStr = car.base_price || car.base_price_value?.toString();
    const carPrice = carPriceStr ? parseFloat(carPriceStr) : null;
    
    if (filters.minPrice !== undefined && carPrice !== null) {
      const minPrice = Number(filters.minPrice);
      if (!isNaN(minPrice) && carPrice < minPrice) {
        return false;
      }
    }
    
    if (filters.maxPrice !== undefined && carPrice !== null) {
      const maxPrice = Number(filters.maxPrice);
      if (!isNaN(maxPrice) && carPrice > maxPrice) {
        return false;
      }
    }
    
    if (filters.category && car.category !== filters.category) {
      return false;
    }
    
    if (filters.featured && !car.featured) {
      return false;
    }
    
    if (filters.exterior_colors && filters.exterior_colors.length > 0) {
      const carExteriorColors = car.available_exterior_colors || [];
      const hasMatchingExterior = filters.exterior_colors.some((colorName: string) => 
        carExteriorColors.some((carColor: any) => carColor.name === colorName)
      );
      if (!hasMatchingExterior) return false;
    }
    
    if (filters.interior_colors && filters.interior_colors.length > 0) {
      const carInteriorColors = car.available_interior_colors || [];
      const hasMatchingInterior = filters.interior_colors.some((colorName: string) => 
        carInteriorColors.some((carColor: any) => carColor.name === colorName)
      );
      if (!hasMatchingInterior) return false;
    }
    
    if (filters.colors && filters.colors.length > 0) {
      const allCarColors = [
        ...(car.available_exterior_colors || []),
        ...(car.available_interior_colors || [])
      ];
      
      const hasMatchingColor = filters.colors.some((colorId: number) => 
        allCarColors.some((carColor: any) => carColor.id === colorId)
      );
      if (!hasMatchingColor) return false;
    }
    
    return true;
  });
};