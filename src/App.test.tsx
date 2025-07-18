import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';

import App from './App.tsx';

import { getSearchQuery } from './utils/localStorage.ts';

import { TEST_IDS, SEARCH_QUERIES } from './__tests__/testConstants.ts';

const { LOADER, SEARCH_FORM, SEARCH_INPUT } = TEST_IDS;
const { lukeSearchQuery } = SEARCH_QUERIES;

vi.mock('./utils/api.ts', () => ({
  fetchPeople: vi.fn().mockResolvedValue([
    {
      uid: '1',
      name: 'Luke Skywalker',
      url: 'https://swapi.tech/api/people/1',
    },
  ]),
}));

vi.mock('./utils/localStorage.ts', () => ({
  getSearchQuery: vi.fn(() => lukeSearchQuery),
  setSearchQuery: vi.fn(),
}));

const mockedFetchPeople = (await import('./utils/api.ts'))
  .fetchPeople as unknown as ReturnType<typeof vi.fn>;

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders Header, SearchBar, ResultList and SimulateErrorButton', async () => {
    render(<App />);

    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();

    const searchBar = screen.getByTestId(SEARCH_FORM);
    expect(searchBar).toBeInTheDocument();

    const resultHeader = await screen.findByText(/search result/i);
    expect(resultHeader).toBeInTheDocument();

    const simulateErrorButton = screen.getByText(/throw simulated error/i);
    expect(simulateErrorButton).toBeInTheDocument();
  });

  it('renders Header and SearchBar with initial searchQuery', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /people from the star wars universe/i
    );
    expect(screen.getByTestId('search-input')).toHaveValue('');
  });

  it('displays result list after successful fetch', async () => {
    render(<App />);
    const person = await screen.findByText('Luke Skywalker');
    expect(person).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    mockedFetchPeople.mockRejectedValueOnce(new Error('Network error'));
    render(<App />);
    const error = await screen.findByText(/network error/i);
    expect(error).toBeInTheDocument();
  });

  it('saves search term to localStorage', () => {
    render(<App />);

    const input = screen.getByTestId(SEARCH_INPUT);
    const searchForm = screen.getByTestId(SEARCH_FORM);

    fireEvent.change(input, { target: { value: lukeSearchQuery } });
    fireEvent.submit(searchForm);

    const searchQueryFromLS: string = getSearchQuery();
    expect(searchQueryFromLS).toEqual(lukeSearchQuery);
  });

  it('shows loader when loading is true', async () => {
    mockedFetchPeople.mockImplementation(() => {
      return new Promise(() => {});
    });

    render(<App />);

    const loader = await screen.findByTestId(LOADER);
    expect(loader).toBeInTheDocument();
  });
});
