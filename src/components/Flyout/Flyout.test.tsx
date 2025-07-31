import '@testing-library/jest-dom/vitest';
import { screen, fireEvent, cleanup, render } from '@testing-library/react';
import { describe, it, afterEach, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { Flyout } from '@/components/Flyout/Flyout';
import { selectPerson } from '@/store/selectedPeopleSlice';
import type { PersonPreview } from '@/types/person';

import { createTestStore } from '@/__tests__/utils/createTestStore';
import { lukeSkywalker, c3po } from '@/__tests__/mocks/peopleMocks';

describe('Flyout', () => {
  afterEach(() => cleanup());

  const renderWithStore = (selectedPeople: PersonPreview[] = []) => {
    const testStore = createTestStore();

    selectedPeople.forEach((person: PersonPreview) => {
      testStore.dispatch(selectPerson(person));
    });

    return {
      testStore,
      ...render(
        <Provider store={testStore}>
          <MemoryRouter>
            <Flyout />
          </MemoryRouter>
        </Provider>
      ),
    };
  };

  it('does not render if no people are selected', () => {
    renderWithStore();
    expect(screen.queryByText(/item is selected/i)).not.toBeInTheDocument();
  });

  it('renders with one selected person', () => {
    renderWithStore([lukeSkywalker]);
    expect(screen.getByText(/1 item is selected/i)).toBeInTheDocument();
  });

  it('renders with multiple selected people', () => {
    renderWithStore([lukeSkywalker, c3po]);
    expect(screen.getByText(/2 items are selected/i)).toBeInTheDocument();
  });

  it('calls dispatch(clearAll) when "Unselect All" is clicked', () => {
    const { testStore } = renderWithStore([lukeSkywalker]);

    const unselectButton = screen.getByText(/unselect all/i);
    fireEvent.click(unselectButton);

    expect(testStore.getState().selectedPeople.people).toEqual([]);
  });
});
