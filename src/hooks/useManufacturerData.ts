// components/manufacturers/hooks/useManufacturerData.ts
import { useState } from 'react';
import { type Manufacturer } from './useManufacturers';

export const useManufacturerData = (
  manufacturers: Manufacturer[] | undefined,
  maxItems: number
) => {
  const [showAll, setShowAll] = useState(false);

  // Filter manufacturers to show only non-EV only manufacturers if needed
  const filteredManufacturers = manufacturers?.filter(manufacturer => !manufacturer.is_ev_only) || [];
  
  const displayManufacturers = showAll 
    ? filteredManufacturers 
    : filteredManufacturers.slice(0, maxItems);

  const toggleShowAll = () => {
    setShowAll(prev => !prev);
  };

  return {
    showAll,
    filteredManufacturers,
    displayManufacturers,
    toggleShowAll
  };
};