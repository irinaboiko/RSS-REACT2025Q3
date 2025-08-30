import { createContext } from 'react';

import type { SortDirection } from '@/types/table';

export interface ColumnsSortContextType {
  direction: SortDirection;
  toggleDirection: () => void;
}

export const ColumnsSortContext = createContext<ColumnsSortContextType | null>(
  null
);
