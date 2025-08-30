import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { MAX_YEAR } from '@/config/constants';
import { YearSelectionContext } from '@/context/yearSelectionContext';

export interface YearSelectionProviderProps {
  children: ReactNode;
}

export const YearSelectionProvider = ({
  children,
}: YearSelectionProviderProps) => {
  const [currentYear, setCurrentYear] = useState<number>(MAX_YEAR);

  const value = useMemo(() => ({ currentYear, setCurrentYear }), [currentYear]);

  return (
    <YearSelectionContext.Provider value={value}>
      {children}
    </YearSelectionContext.Provider>
  );
};
