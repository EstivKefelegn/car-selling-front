import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CarFilter } from '../services/filters';

interface CarFilterStore {
  filters: CarFilter;
  setFilters: (filters: CarFilter) => void;
  clearFilters: () => void;
  updateFilter: (key: keyof CarFilter, value: any) => void;
}

const useCarFilterStore = create<CarFilterStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'car-filter-storage', // name for localStorage
    }
  )
);

export default useCarFilterStore;