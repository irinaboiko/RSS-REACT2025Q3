import { useState } from 'react';
import type { ReactNode } from 'react';

import { ColumnsSortContext } from '@/context/columnsSortContext';
import type { SortDirection } from '@/types/table';

export interface ColumnsSortProviderProps {
  children: ReactNode;
}

export const ColumnsSortProvider = ({ children }: ColumnsSortProviderProps) => {
  const [direction, setDirection] = useState<SortDirection>('asc');

  const toggleDirection = () => {
    setDirection(direction === 'asc' ? 'desc' : 'asc');
  };

  return (
    <ColumnsSortContext.Provider value={{ direction, toggleDirection }}>
      {children}
    </ColumnsSortContext.Provider>
  );
};
