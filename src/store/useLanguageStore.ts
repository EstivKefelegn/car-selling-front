import {create} from 'zustand';
import i18n from '../i18n';

interface LanguageState {
  language: string;
  setLanguage: (lng: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: i18n.language || 'en',
  setLanguage: (lng: string) => {
    i18n.changeLanguage(lng); // update i18next
    set({ language: lng });   // update Zustand store
  },
}));
