// hooks/useSearch.ts
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
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

  // Submit search and navigate to /cars with URL parameter
  const submitSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;

      // Encode the search query for URL
      const encodedQuery = encodeURIComponent(query.trim());
      
      // Navigate to /cars with search query parameter
      navigate(`/cars?search=${encodedQuery}`);
    },
    [navigate]
  );

  const handleQuickSearch = useCallback(
    (term: string) => {
      setSearchQuery(term);
      submitSearch(term);
    },
    [submitSearch]
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      submitSearch(searchQuery);
    },
    [searchQuery, submitSearch]
  );

  return {
    searchQuery,
    isSearchFocused,
    handleSearchChange,
    handleSearchFocus,
    handleSearchBlur,
    handleQuickSearch,
    handleSearchSubmit,
  };
};