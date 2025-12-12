import { create } from 'zustand';

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  // Initialize from localStorage
  isDarkMode: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('isDarkMode') || 'false')
    : false,

  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return { isDarkMode: newMode };
    });
  },

  setDarkMode: (value: boolean) => {
    set(() => {
      localStorage.setItem('isDarkMode', JSON.stringify(value));
      return { isDarkMode: value };
    });
  },
}));
