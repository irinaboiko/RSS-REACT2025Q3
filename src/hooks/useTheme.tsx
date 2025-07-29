import { useContext } from 'react';

import { ThemeContext } from '@/contexts/theme';
import type { ThemeContextType } from '@/types/theme';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  return (
    context ?? {
      theme: 'light',
      setTheme: () => {}, // noop
    }
  );
};
