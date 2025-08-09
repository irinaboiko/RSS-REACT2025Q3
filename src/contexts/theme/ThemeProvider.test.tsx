import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ThemeComponent } from '@/__tests__/components/ThemeComponent';
import { ThemeProvider } from '@/contexts/theme';
import type { ThemeOptions } from '@/types/theme';

const setStoredThemeMock = vi.fn();
let mockedStoredTheme: ThemeOptions | string = 'dark';

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: () => [mockedStoredTheme, setStoredThemeMock],
}));

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => cleanup());

  it('adds dark class to document.documentElement when theme is dark', () => {
    mockedStoredTheme = 'dark';

    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class from root when theme is light', () => {
    mockedStoredTheme = 'light';

    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('sets light theme when theme is not stored in localStorage', () => {
    mockedStoredTheme = '';

    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );

    expect(setStoredThemeMock).toHaveBeenCalledWith('light');
  });

  it('sets theme on Set Theme button click', () => {
    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );

    const setThemeButton = screen.getByRole('button');
    fireEvent.click(setThemeButton);

    expect(setStoredThemeMock).toHaveBeenCalledWith('dark');
  });
});
