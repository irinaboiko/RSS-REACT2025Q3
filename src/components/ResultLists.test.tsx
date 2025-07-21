import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { ResultList } from '@/components/ResultLists';

import type { PersonPreview } from '@/types/person';

import { lukeSkywalker, c3po } from '@/__tests__/mocks/peopleMocks';
import { TEST_IDS, MESSAGES } from '@/__tests__/testConstants';

const { LOADER, PERSON_PREVIEW_CARD } = TEST_IDS;
const { noSearchResults } = MESSAGES;

describe('ResultLists', () => {
  const mockPeople: PersonPreview[] = [lukeSkywalker, c3po];

  afterEach(() => {
    cleanup();
  });

  it('renders Loader when loading is true', () => {
    render(<ResultList people={[]} loading={true} />);

    const loader = screen.getByTestId(LOADER);
    expect(loader).toBeInTheDocument();
  });

  it('renders correct number of PersonPreviewCards', () => {
    render(<ResultList people={mockPeople} loading={false} />);

    const cards = screen.getAllByTestId(PERSON_PREVIEW_CARD);
    expect(cards.length).toBe(2);
  });

  it('displays items data correctly', () => {
    render(<ResultList people={mockPeople} loading={false} />);

    const resultHeader = screen.getByText(/search result/i);
    expect(resultHeader).toBeInTheDocument();

    for (const person of mockPeople) {
      expect(screen.getByText(person.name)).toBeInTheDocument();
      expect(screen.getByText(person.url)).toBeInTheDocument();
    }
  });

  it('displays "no results" message when data array is empty', () => {
    render(<ResultList people={[]} loading={false} />);

    const noResultsMessage = screen.getByText(noSearchResults);
    expect(noResultsMessage).toBeInTheDocument();
  });
});
