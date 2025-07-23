import { useCallback } from 'react';

export const SEARCH_KEY = 'searchQuery';

export const useLocalStorage = () => {
  const getSearchQueryFromLocalStorage = useCallback((): string => {
    return localStorage.getItem(SEARCH_KEY) || '';
  }, []);

  const setSearchQueryToLocalStorage = useCallback((query: string): void => {
    localStorage.setItem(SEARCH_KEY, query);
  }, []);

  const clearSearchQueryFromLocalStorage = useCallback((): void => {
    localStorage.removeItem(SEARCH_KEY);
  }, []);

  return {
    getSearchQueryFromLocalStorage,
    setSearchQueryToLocalStorage,
    clearSearchQueryFromLocalStorage,
  };
};
