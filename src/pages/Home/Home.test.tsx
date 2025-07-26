import '@testing-library/jest-dom/vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';

import { Home } from '@/pages/Home';

import { fetchAllPeople, fetchSearchedPeople } from '@/api';

import { TEST_IDS, SEARCH_QUERIES } from '@/__tests__/testConstants';

const { SEARCH_FORM, SEARCH_INPUT } = TEST_IDS;
const { lukeSearchQuery } = SEARCH_QUERIES;

vi.mock('@/api', () => ({
  fetchAllPeople: vi.fn().mockResolvedValue({
    data: [
      {
        uid: '1',
        name: 'Luke Skywalker',
        url: 'https://swapi.tech/api/people/1',
      },
    ],
    totalPages: 3,
  }),
  fetchSearchedPeople: vi.fn().mockResolvedValue([
    {
      uid: '1',
      name: 'Luke Skywalker',
      url: 'https://swapi.tech/api/people/1',
    },
  ]),
}));

const renderHome = (route: string = '/home?page=1') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </MemoryRouter>
  );

describe('Home page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders SearchBar', async () => {
    renderHome();
    expect(screen.getByTestId(SEARCH_FORM)).toBeInTheDocument();
  });

  it('calls fetchAllPeople with current page on mount', async () => {
    renderHome('/home?page=2');

    await waitFor(() => {
      expect(fetchAllPeople).toHaveBeenCalledWith(2);
    });
  });

  it('renders search result from API', async () => {
    renderHome();
    expect(await screen.findByText(/luke skywalker/i)).toBeInTheDocument();
  });

  it('submits search and calls fetchSearchedPeople', async () => {
    renderHome();

    const input = screen.getByTestId(SEARCH_INPUT);
    const form = screen.getByTestId(SEARCH_FORM);

    fireEvent.change(input, { target: { value: lukeSearchQuery } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetchSearchedPeople).toHaveBeenCalledWith(lukeSearchQuery);
    });
  });

  it('renders error message on fetchAllPeople error', async () => {
    vi.mocked(fetchAllPeople).mockRejectedValueOnce(new Error('API failure'));
    renderHome();

    expect(await screen.findByText(/api failure/i)).toBeInTheDocument();
  });

  it('renders correct pagination totalPages and currentPage', async () => {
    renderHome('/home?page=3');
    expect(await screen.findByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
