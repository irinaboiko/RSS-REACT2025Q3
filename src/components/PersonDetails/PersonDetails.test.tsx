import '@testing-library/jest-dom/vitest';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { PersonDetails } from '@/components/PersonDetails/PersonDetails';

import { TEST_IDS } from '@/__tests__/testConstants';

const { LOADER, PERSON_DETAILS_NAME } = TEST_IDS;

vi.mock('@api', () => ({
  fetchPersonDetails: vi.fn().mockResolvedValue({
    data: [
      {
        properties: {
          created: '2025-07-23T16:37:44.996Z',
          edited: '2025-07-23T16:37:44.996Z',
          name: 'Luke Skywalker',
          gender: 'male',
          skin_color: 'fair',
          hair_color: 'blond',
          height: '172',
          eye_color: 'blue',
          mass: '77',
          homeworld: 'https://www.swapi.tech/api/planets/1',
          birth_year: '19BBY',
          url: 'https://www.swapi.tech/api/people/1',
        },
        _id: '5f63a36eee9fd7000499be42',
        description: 'A person within the Star Wars universe',
        uid: '1',
        __v: 2,
      },
    ],
  }),
}));

const renderPersonDetails = (route: string = '/details/1') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/details/:detailsId" element={<PersonDetails />} />
      </Routes>
    </MemoryRouter>
  );

describe('Person Details', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders details', async () => {
    renderPersonDetails();

    await waitFor(() => {
      expect(screen.getByTestId(PERSON_DETAILS_NAME)).toBeInTheDocument();
    });
  });

  it('shows loader', () => {
    renderPersonDetails();

    const loader = screen.getByTestId(LOADER);
    expect(loader).toBeInTheDocument();
  });
});
