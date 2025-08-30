import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { ColumnsSortContext } from '@/context/columnsSortContext';
import type { SortDirection } from '@/types/table';

export interface ColumnsSortProviderProps {
  children: ReactNode;
}

export const ColumnsSortProvider = ({ children }: ColumnsSortProviderProps) => {
  const [direction, setDirection] = useState<SortDirection>('asc');

  const toggleDirection = useCallback(() => {
    setDirection(direction === 'asc' ? 'desc' : 'asc');
  }, [direction]);

  const value = useMemo(
    () => ({ direction, toggleDirection }),
    [direction, toggleDirection]
  );

  return (
    <ColumnsSortContext.Provider value={value}>
      {children}
    </ColumnsSortContext.Provider>
  );
};
