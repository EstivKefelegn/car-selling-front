// store/useCarFilterStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CarFilter, CarFilterKey } from '../services/filters';

interface CarFilterStore {
  filters: CarFilter;
  setFilters: (filters: CarFilter) => void;
  clearFilters: () => void;
  updateFilter: (key: CarFilterKey, value: any) => void;
  // Helper methods for color filters
  addColorFilter: (type: 'exterior' | 'interior', colorName: string) => void;
  removeColorFilter: (type: 'exterior' | 'interior', colorName: string) => void;
  toggleColorFilter: (type: 'exterior' | 'interior', colorName: string) => void;
  resetColorFilters: () => void;
  // Get active filter count
  getActiveFilterCount: () => number;
}

const useCarFilterStore = create<CarFilterStore>()(
  persist(
    (set, get) => ({
      filters: {},
      
      setFilters: (filters) => set({ filters }),
      
      clearFilters: () => set({ filters: {} }),
      
      updateFilter: (key, value) => 
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),
      
      // Add a color filter
      addColorFilter: (type, colorName) => {
        const key = type === 'exterior' ? 'exterior_colors' : 'interior_colors';
        const current = get().filters[key] || [];
        
        if (!current.includes(colorName)) {
          set((state) => ({
            filters: {
              ...state.filters,
              [key]: [...current, colorName],
            },
          }));
        }
      },
      
      // Remove a color filter
      removeColorFilter: (type, colorName) => {
        const key = type === 'exterior' ? 'exterior_colors' : 'interior_colors';
        const current = get().filters[key] || [];
        
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: current.filter(c => c !== colorName),
          },
        }));
      },
      
      // Toggle a color filter
      toggleColorFilter: (type, colorName) => {
        const key = type === 'exterior' ? 'exterior_colors' : 'interior_colors';
        const current = get().filters[key] || [];
        
        if (current.includes(colorName)) {
          get().removeColorFilter(type, colorName);
        } else {
          get().addColorFilter(type, colorName);
        }
      },
      
      // Reset all color filters
      resetColorFilters: () => 
        set((state) => ({
          filters: {
            ...state.filters,
            exterior_colors: undefined,
            interior_colors: undefined,
            colors: undefined,
          },
        })),
      
      // Get count of active filters
      getActiveFilterCount: () => {
        const filters = get().filters;
        return getActiveFilterCount(filters);
      },
    }),
    {
      name: 'car-filter-storage',
      // Only persist the filters
      partialize: (state) => ({ filters: state.filters }),
    }
  )
);

// Helper function for the store
function getActiveFilterCount(filters: CarFilter): number {
  let count = 0;
  
  if (filters.manufacturer) count++;
  if (filters.model) count++;
  if (filters.minYear || filters.maxYear) count++;
  if (filters.minPrice || filters.maxPrice) count++;
  if (filters.category) count++;
  if (filters.featured) count++;
  if (filters.search) count++;
  
  // Count color filters
  if (filters.exterior_colors?.length) count++;
  if (filters.interior_colors?.length) count++;
  if (filters.colors?.length && !filters.exterior_colors?.length && !filters.interior_colors?.length) count++;
  
  return count;
}

export default useCarFilterStore;