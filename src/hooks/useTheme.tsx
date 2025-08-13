import { useContext } from 'react';

import { ThemeContext } from '@/contexts/theme/ThemeContext';
import type { ThemeContextType } from '@/types/theme';
import { LIGHT_THEME } from '@/constants/common';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  return (
    context ?? {
      theme: LIGHT_THEME,
      setTheme: () => {},
    }
  );
};
