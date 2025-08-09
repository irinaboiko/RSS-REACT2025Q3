import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { PersonPreviewCard } from '@/components/PersonPreviewCard';
import type { PersonPreview } from '@/types/person';

import { lukeSkywalker } from '@/__tests__/mocks/peopleMocks';
import { createTestStore } from '@/__tests__/utils/createTestStore';

describe('PersonPreviewCard', () => {
  afterEach(() => cleanup());

  const renderWithStore = (person: PersonPreview) =>
    render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <PersonPreviewCard person={person} />
        </MemoryRouter>
      </Provider>
    );

  it('displays person card correctly', () => {
    renderWithStore(lukeSkywalker);

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  });

  it('selects person when checkbox is checked', () => {
    renderWithStore(lukeSkywalker);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('unselects person when checkbox is unchecked', () => {
    renderWithStore(lukeSkywalker);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
