import { useContext } from 'react';

import { YearSelectionContext } from '@/context/yearSelectionContext';
import type { YearSelectionContextType } from '@/context/yearSelectionContext';

export const useYearSelection = (): YearSelectionContextType => {
  const context = useContext(YearSelectionContext);

  if (!context) {
    throw new Error(
      'useYearSelection must be used within a YearSelectionProvider'
    );
  }

  return context;
};
