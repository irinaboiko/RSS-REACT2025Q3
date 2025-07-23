import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useLocalStorage, SEARCH_KEY } from '@/hooks/useLocalStorage';

import { SEARCH_QUERIES } from '@/__tests__/testConstants';

const { lukeSearchQuery, darthSearchQuery } = SEARCH_QUERIES;

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('populates search query in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage());

    result.current.setSearchQueryToLocalStorage(lukeSearchQuery);
    const stored = localStorage.getItem(SEARCH_KEY);
    expect(stored).toBe(lukeSearchQuery);

    const value = result.current.getSearchQueryFromLocalStorage();
    expect(value).toBe(lukeSearchQuery);
  });

  it('clears search query from localStorage', () => {
    localStorage.setItem(SEARCH_KEY, darthSearchQuery);
    const { result } = renderHook(() => useLocalStorage());

    result.current.clearSearchQueryFromLocalStorage();
    expect(localStorage.getItem(SEARCH_KEY)).toBeNull();
  });

  it('renders empty string when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage());

    const value = result.current.getSearchQueryFromLocalStorage();
    expect(value).toBe('');
  });

  it('returns empty string when empty string is stored', () => {
    const { result } = renderHook(() => useLocalStorage());

    result.current.setSearchQueryToLocalStorage('');
    const value = result.current.getSearchQueryFromLocalStorage();

    expect(value).toBe('');
  });

  it('overwrites existing search query', () => {
    const { result } = renderHook(() => useLocalStorage());

    result.current.setSearchQueryToLocalStorage(lukeSearchQuery);
    const initialValue = result.current.getSearchQueryFromLocalStorage();
    expect(initialValue).toBe(lukeSearchQuery);

    result.current.setSearchQueryToLocalStorage(darthSearchQuery);
    const overwrittenValue = result.current.getSearchQueryFromLocalStorage();
    expect(overwrittenValue).toBe(darthSearchQuery);
  });
});
