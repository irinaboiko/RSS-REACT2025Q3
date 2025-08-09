import { render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';

import { AppErrorBoundary } from '@/components/AppErrorBoundary';
import { BrokenComponent } from '@/__tests__/components/BrockenComponents';

import { TEST_IDS } from '@/__tests__/testConstants';

const { APP_FALLBACK } = TEST_IDS;

describe('AppErrorBoundary', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  beforeEach(() => {
    console.error = vi.fn();
    vi.resetAllMocks();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when no error occurs', () => {
    render(
      <AppErrorBoundary>
        <p>Safe Component</p>
      </AppErrorBoundary>
    );

    expect(screen.getByText(/safe component/i)).toBeInTheDocument();
    expect(screen.queryByTestId(APP_FALLBACK)).not.toBeInTheDocument();
  });

  it('catches error and renders fallback UI', () => {
    render(
      <AppErrorBoundary>
        <BrokenComponent />
      </AppErrorBoundary>
    );

    expect(screen.queryByTestId(APP_FALLBACK)).toBeInTheDocument();
  });

  it('clears localStorage on Refresh button click', () => {
    const localStorageClearSpy = vi
      .spyOn(localStorage.__proto__, 'clear')
      .mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <BrokenComponent />
      </AppErrorBoundary>
    );

    const refreshButton = screen.getByRole('button', { name: /refresh page/i });
    refreshButton.click();

    expect(localStorageClearSpy).toHaveBeenCalled();
  });
});
