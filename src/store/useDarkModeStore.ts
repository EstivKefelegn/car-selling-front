import {create} from 'zustand';

interface DarkModeState {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    setDarkMode: (value: boolean) => void
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
    isDarkMode: false,
    
    toggleDarkMode: () => 
        set((state) => ({ isDarkMode: !state.isDarkMode})),

    setDarkMode: (value: boolean) => 
        set({ isDarkMode: value})
}))



