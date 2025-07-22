export const SEARCH_KEY = 'searchQuery';

export const clearSearchQueryFromLocalStorage = (): void => {
  localStorage.removeItem(SEARCH_KEY);
};

export const getSearchQueryFromLocalStorage = (): string => {
  return localStorage.getItem(SEARCH_KEY) || '';
};

export const setSearchQueryToLocalStorage = (query: string): void => {
  localStorage.setItem(SEARCH_KEY, query);
};
