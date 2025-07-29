import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DarkThemeComponent } from '@/__tests__/DarkThemeComponent';
import { ThemeProvider } from '@/contexts/theme';

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: () => ['dark', vi.fn()],
}));

describe('ThemeProvider', () => {
  it('adds dark class to document.documentElement when theme is dark', () => {
    render(
      <ThemeProvider>
        <DarkThemeComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
