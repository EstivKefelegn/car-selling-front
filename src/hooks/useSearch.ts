// components/hero/hooks/useSearch.ts
import { useState, useCallback } from 'react';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  const handleQuickSearch = useCallback((term: string) => {
    setSearchQuery(term);
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/all-cars?search=${encodeURIComponent(searchQuery)}`;
    }
  }, [searchQuery]);

  return {
    searchQuery,
    isSearchFocused,
    handleSearchChange,
    handleSearchFocus,
    handleSearchBlur,
    handleQuickSearch,
    handleSearchSubmit
  };
};