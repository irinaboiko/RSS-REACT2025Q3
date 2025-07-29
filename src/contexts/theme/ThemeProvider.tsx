import { type ReactNode, useEffect } from 'react';

import { ThemeContext } from '@/contexts/theme';
import { useLocalStorage } from '@/hooks';
import type { ThemeOptions } from '@/types/theme';
import { THEME_KEY } from '@/constants/common';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [storedTheme, setStoredTheme] = useLocalStorage(THEME_KEY);

  const theme: ThemeOptions =
    storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light';

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (storedTheme !== theme) {
      setStoredTheme(theme);
    }
  }, [theme, storedTheme, setStoredTheme]);

  const setTheme = (value: ThemeOptions) => {
    setStoredTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
