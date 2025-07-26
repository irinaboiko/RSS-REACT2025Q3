import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';

import { AppRoutes } from '@/routes/AppRoutes';
import { ROUTES } from '@/constants/routes';

describe('AppRoutes', () => {
  afterEach(() => {
    cleanup();
  });

  it('redirects from "/" to "/home"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('Star Wars Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders Home page for "/home"', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.HOME]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('Star Wars Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders About page for "/about"', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.ABOUT]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/about the author/i)).toBeInTheDocument();
  });

  it('renders NotFound page for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/random']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Looks like this page made the jump to hyperspace.')
    ).toBeInTheDocument();
  });
});
