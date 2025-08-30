import { createContext } from 'react';

export interface SearchBarContextType {
  searchValue: string;
  debouncedValue: string;
  onSearchChange: (searchValue: string) => void;
  clearSearchValue: () => void;
}

export const SearchBarContext = createContext<SearchBarContextType | null>(
  null
);
