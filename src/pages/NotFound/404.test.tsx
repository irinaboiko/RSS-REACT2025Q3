import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';

import { NotFound } from '@/pages/NotFound';

import { ROUTES } from '@/constants/routes';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Not Found', () => {
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

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });
});
