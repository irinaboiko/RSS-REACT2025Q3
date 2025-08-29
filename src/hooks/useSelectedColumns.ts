import {
  SelectedColumnsContext,
  type SelectedColumnsContextType,
} from '@/context/selectedColumnsContext';
import { useContext } from 'react';

export const useSelectedColumns = (): SelectedColumnsContextType => {
  const context = useContext(SelectedColumnsContext);

  if (!context) {
    throw new Error(
      'useSelectedColumns must be used within a SelectedColumnsProvider'
    );
  }

  return context;
};
