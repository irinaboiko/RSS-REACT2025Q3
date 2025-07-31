import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { ResultList } from '@/components/ResultLists';
import type { PersonPreview } from '@/types/person';

import { lukeSkywalker, c3po } from '@/__tests__/mocks/peopleMocks';
import { TEST_IDS, MESSAGES } from '@/__tests__/testConstants';
import { createTestStore } from '@/__tests__/utils/createTestStore';

const { LOADER, PERSON_PREVIEW_CARD } = TEST_IDS;
const { noSearchResults } = MESSAGES;

describe('ResultLists', () => {
  const mockPeople: PersonPreview[] = [lukeSkywalker, c3po];

  afterEach(() => {
    cleanup();
  });

  const renderWithStore = (people: PersonPreview[], loading: boolean) =>
    render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <ResultList people={people} loading={loading} />
        </MemoryRouter>
      </Provider>
    );

  it('renders Loader when loading is true', () => {
    renderWithStore([], true);

    const loader = screen.getByTestId(LOADER);
    expect(loader).toBeInTheDocument();
  });

  it('renders correct number of PersonPreviewCards', () => {
    renderWithStore(mockPeople, false);

    const cards = screen.getAllByTestId(PERSON_PREVIEW_CARD);
    expect(cards.length).toBe(2);
  });

  it('displays items data correctly', () => {
    renderWithStore(mockPeople, false);

    const resultHeader = screen.getByText(/search result/i);
    expect(resultHeader).toBeInTheDocument();

    for (const person of mockPeople) {
      const cardText = `${person.uid} - ${person.name}`;
      expect(screen.getByText(cardText)).toBeInTheDocument();
    }
  });

  it('displays "no results" message when data array is empty', () => {
    renderWithStore([], false);

    const noResultsMessage = screen.getByText(noSearchResults);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
