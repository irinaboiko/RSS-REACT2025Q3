import { useState } from 'react';
import type { ReactNode } from 'react';

import { SearchBarContext } from '@/context/searchBarContext';

export interface SearchBarProviderProps {
  children: ReactNode;
}

export const SearchBarProvider = ({ children }: SearchBarProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchChange = (value: string) => setSearchValue(value);

  const clearSearchValue = () => setSearchValue('');

  return (
    <SearchBarContext.Provider
      value={{ searchValue, onSearchChange, clearSearchValue }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};
