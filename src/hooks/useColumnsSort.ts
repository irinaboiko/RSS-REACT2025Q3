import { useContext } from 'react';

import { ColumnsSortContext } from '@/context/columnsSortContext';
import type { ColumnsSortContextType } from '@/context/columnsSortContext';

export const useColumnsSort = (): ColumnsSortContextType => {
  const context = useContext(ColumnsSortContext);

  if (!context) {
    throw new Error('useColumnsSort must be used within a ColumnsSortProvider');
  }

  return context;
};
