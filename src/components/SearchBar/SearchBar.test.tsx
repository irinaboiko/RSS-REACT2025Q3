import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';

import { SearchBar } from '@/components/SearchBar';

import { useLocalStorage } from '@/hooks/useLocalStorage';

import { TEST_IDS, SEARCH_QUERIES } from '@/__tests__/testConstants';

const { SEARCH_FORM, SEARCH_INPUT, SEARCH_BUTTON } = TEST_IDS;
const { lukeSearchQuery, lukeSearchQueryWithWhitespaces } = SEARCH_QUERIES;

describe('SearchBar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders search input and search button', () => {
    render(
      <SearchBar searchQuery={''} onSearch={() => {}} onChange={() => {}} />
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    expect(searchButton).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();

    render(
      <SearchBar searchQuery="" onSearch={() => {}} onChange={handleChange} />
    );

    const input = screen.getByTestId(SEARCH_INPUT);
    fireEvent.change(input, { target: { value: lukeSearchQuery } });

    expect(handleChange).toHaveBeenCalledWith(lukeSearchQuery);
  });

  it('calls onSearch with trimmed query on form submit', () => {
    const handleSearch = vi.fn();

    render(
      <SearchBar
        searchQuery={lukeSearchQuery}
        onSearch={handleSearch}
        onChange={() => {}}
      />
    );

    const form = screen.getByTestId(SEARCH_FORM);
    fireEvent.submit(form);

    expect(handleSearch).toHaveBeenCalledWith(lukeSearchQuery);
  });

  it('shows empty input when no saved term exists', () => {
    const { result } = renderHook(() => useLocalStorage());

    const value = result.current.getSearchQueryFromLocalStorage();

    render(
      <SearchBar onSearch={() => {}} searchQuery={value} onChange={() => {}} />
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toHaveValue('');
  });

  it('displays previously saved search term from localStorage on mount', () => {
    const { result } = renderHook(() => useLocalStorage());

    result.current.setSearchQueryToLocalStorage(lukeSearchQuery);
    const searchQueryFromLS: string =
      result.current.getSearchQueryFromLocalStorage();

    render(
      <SearchBar
        onSearch={() => {}}
        searchQuery={searchQueryFromLS}
        onChange={() => {}}
      />
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toHaveValue(lukeSearchQuery);
  });

  it('trims whitespace from search input', () => {
    const handleSearch = vi.fn();

    render(
      <SearchBar
        searchQuery={lukeSearchQueryWithWhitespaces}
        onSearch={handleSearch}
        onChange={() => {}}
      />
    );

    const form = screen.getByTestId(SEARCH_FORM);
    fireEvent.submit(form);

    expect(handleSearch).toHaveBeenCalledWith(lukeSearchQuery);
  });
});
