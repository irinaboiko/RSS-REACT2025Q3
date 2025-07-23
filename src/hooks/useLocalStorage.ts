export const SEARCH_KEY = 'searchQuery';

export const useLocalStorage = () => {
  const getSearchQueryFromLocalStorage = (): string => {
    return localStorage.getItem(SEARCH_KEY) || '';
  };

  const setSearchQueryToLocalStorage = (query: string): void => {
    localStorage.setItem(SEARCH_KEY, query);
  };

  const clearSearchQueryFromLocalStorage = (): void => {
    localStorage.removeItem(SEARCH_KEY);
  };

  return {
    getSearchQueryFromLocalStorage,
    setSearchQueryToLocalStorage,
    clearSearchQueryFromLocalStorage,
  };
};
