import { type ReactNode, useEffect } from 'react';

import { ThemeContext } from '@/contexts/theme';
import { useLocalStorage } from '@/hooks';
import type { ThemeOptions } from '@/types/theme';
import { DARK_THEME, LIGHT_THEME, THEME_KEY } from '@/constants/common';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [storedTheme, setStoredTheme] = useLocalStorage(THEME_KEY);

  const theme: ThemeOptions =
    storedTheme === DARK_THEME || storedTheme === LIGHT_THEME
      ? storedTheme
      : LIGHT_THEME;

  useEffect(() => {
    const root = document.documentElement;

    if (theme === DARK_THEME) {
      root.classList.add(DARK_THEME);
    } else {
      root.classList.remove(DARK_THEME);
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
