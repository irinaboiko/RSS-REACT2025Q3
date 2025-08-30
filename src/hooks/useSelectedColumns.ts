import { useContext } from 'react';

import { SelectedColumnsContext } from '@/context/selectedColumnsContext';
import type { SelectedColumnsContextType } from '@/context/selectedColumnsContext';

export const useSelectedColumns = (): SelectedColumnsContextType => {
  const context = useContext(SelectedColumnsContext);

  if (!context) {
    throw new Error(
      'useSelectedColumns must be used within a SelectedColumnsProvider'
    );
  }

  return context;
};
