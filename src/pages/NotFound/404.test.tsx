import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';

import { NotFound } from '@/pages/NotFound';

import { ROUTES } from '@/constants/routes';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const mockedNavigate = vi.fn();

describe('Not Found', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders component correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getAllByText('4')).toHaveLength(2);
    expect(
      screen.getByText('Looks like this page made the jump to hyperspace.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go home/i })
    ).toBeInTheDocument();
  });

  it('navigates home on Go Home Button click', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /go home/i });
    button.click();

    expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });
});
