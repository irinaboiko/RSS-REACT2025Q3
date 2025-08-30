import { useContext } from 'react';

import { SearchBarContext } from '@/context/searchBarContext';
import type { SearchBarContextType } from '@/context/searchBarContext';

export const useSearchBar = (): SearchBarContextType => {
  const context = useContext(SearchBarContext);

  if (!context) {
    throw new Error('useSearchBar must be used within a SearchBarProvider');
  }

  return context;
};
