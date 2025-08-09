import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';

import { AppRoutes } from '@/routes/AppRoutes';
import { ROUTES } from '@/constants/routes';
import { createTestStore } from '@/__tests__/utils/createTestStore';
import { Provider } from 'react-redux';

describe('AppRoutes', () => {
  const renderWithStore = (initialEntries: string[] = ['/']) =>
    render(
      <Provider store={createTestStore()}>
        <MemoryRouter initialEntries={initialEntries}>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );

  it('redirects from "/" to "/home"', () => {
    renderWithStore();

    const logo = screen.getByAltText('Star Wars Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders Home page for "/home"', () => {
    renderWithStore([ROUTES.HOME]);

    const logo = screen.getByAltText('Star Wars Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders About page for "/about"', () => {
    renderWithStore([ROUTES.ABOUT]);

    expect(screen.getByText(/about the author/i)).toBeInTheDocument();
  });

  it('renders NotFound page for unknown route', () => {
    renderWithStore(['/unknown']);

    expect(
      screen.getByText('Looks like this page made the jump to hyperspace.')
    ).toBeInTheDocument();
  });
});
