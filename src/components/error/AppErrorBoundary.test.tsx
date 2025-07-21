import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';

import { AppErrorBoundary } from '@/components/error/AppErrorBoundary';
import { BrokenComponent } from '@/__tests__/BrockenComponents';

import { TEST_IDS } from '@/__tests__/testConstants';

const { APP_FALLBACK } = TEST_IDS;

describe('AppErrorBoundary', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
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
});
