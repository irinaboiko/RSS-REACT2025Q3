import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { SearchBarContext } from '@/context/searchBarContext';

export interface SearchBarProviderProps {
  children: ReactNode;
}

export const SearchBarProvider = ({ children }: SearchBarProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState(searchValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue]);

  const onSearchChange = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  const clearSearchValue = useCallback(() => setSearchValue(''), []);

  const value = useMemo(
    () => ({ searchValue, debouncedValue, onSearchChange, clearSearchValue }),
    [searchValue, debouncedValue, onSearchChange, clearSearchValue]
  );

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
};
