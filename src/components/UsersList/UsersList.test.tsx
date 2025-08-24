import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { UsersList } from '@/components/UsersList/UsersList';
import { mockUsers } from '@/__tests__/mockUsers';
import { createTestStore } from '@/__tests__/createTestStore';
import type { AppTestStore } from '@/__tests__/createTestStore';

describe('UsersList', () => {
  const renderWithStore = (store: AppTestStore) =>
    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );

  it('renders fallback ui if there is no users', () => {
    const emptyStore = createTestStore();

    renderWithStore(emptyStore);

    expect(screen.getByRole('img', { name: /no users/i })).toBeInTheDocument();
    expect(
      screen.getByText(
        /there are no users yet — why not create the first one?/i
      )
    ).toBeInTheDocument();
  });

  it('renders list with heading and user cards when users exist', () => {
    const store = createTestStore({
      users: { users: mockUsers, recentlyAddedId: null },
      countries: { countries: [] },
    });

    renderWithStore(store);

    expect(
      screen.getByRole('heading', { level: 2, name: /users list/i })
    ).toBeInTheDocument();
    const cards = screen.getAllByTestId('user-card');
    expect(cards).toHaveLength(mockUsers.length);
  });
});
