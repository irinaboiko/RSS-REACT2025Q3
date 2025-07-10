const SEARCH_KEY = 'searchQuery';

export const getSearchQuery = (): string => {
  return localStorage.getItem(SEARCH_KEY) || '';
};

export const setSearchQuery = (query: string): void => {
  localStorage.setItem(SEARCH_KEY, query);
};
