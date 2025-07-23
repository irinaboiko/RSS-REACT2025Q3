import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';

import { Home } from '@/pages/Home';

import { getSearchQueryFromLocalStorage } from '@/utils/localStorage';

import { TEST_IDS, SEARCH_QUERIES } from '@/__tests__/testConstants';

const { LOADER, SEARCH_FORM, SEARCH_INPUT } = TEST_IDS;
const { lukeSearchQuery } = SEARCH_QUERIES;

vi.mock('@/api', () => ({
  fetchPeople: vi.fn().mockResolvedValue([
    {
      uid: '1',
      name: 'Luke Skywalker',
      url: 'https://swapi.tech/api/people/1',
    },
  ]),
}));

const mockedFetchPeople = (await import('@/api'))
  .fetchPeople as unknown as ReturnType<typeof vi.fn>;

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders SearchBar', async () => {
    render(<Home />);

    const searchBar = screen.getByTestId(SEARCH_FORM);
    expect(searchBar).toBeInTheDocument();
  });

  it('renders ResultList', async () => {
    render(<Home />);

    const resultHeader = await screen.findByText(/search result/i);
    expect(resultHeader).toBeInTheDocument();
  });

  it('displays result list after successful fetch', async () => {
    render(<Home />);
    const person = await screen.findByText('Luke Skywalker');
    expect(person).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    mockedFetchPeople.mockRejectedValueOnce(new Error('Network error'));
    render(<Home />);
    const error = await screen.findByText(/network error/i);
    expect(error).toBeInTheDocument();
  });

  it('saves search term to localStorage', () => {
    vi.doMock('@/utils/localStorage', () => ({
      getSearchQueryFromLocalStorage: vi.fn(() => lukeSearchQuery),
      setSearchQueryToLocalStorage: vi.fn(),
    }));

    render(<Home />);

    const input = screen.getByTestId(SEARCH_INPUT);
    const searchForm = screen.getByTestId(SEARCH_FORM);

    fireEvent.change(input, { target: { value: lukeSearchQuery } });
    fireEvent.submit(searchForm);

    const searchQueryFromLS: string = getSearchQueryFromLocalStorage();
    expect(searchQueryFromLS).toEqual(lukeSearchQuery);
  });

  it('shows loader when loading is true', async () => {
    mockedFetchPeople.mockImplementation(() => {
      return new Promise(() => {});
    });

    render(<Home />);

    const loader = await screen.findByTestId(LOADER);
    expect(loader).toBeInTheDocument();
  });
});
