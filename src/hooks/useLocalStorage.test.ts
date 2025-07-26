import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useLocalStorage } from '@/hooks/useLocalStorage';

import { SEARCH_QUERIES } from '@/__tests__/testConstants';
import { SEARCH_KEY } from '@/constants/common';

const { lukeSearchQuery, darthSearchQuery } = SEARCH_QUERIES;

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('populates search query in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(SEARCH_KEY));

    act(() => {
      const [, setValue] = result.current;
      setValue(lukeSearchQuery);
    });
    const stored = localStorage.getItem(SEARCH_KEY);
    expect(stored).toBe(lukeSearchQuery);

    const [value] = result.current;
    expect(value).toBe(lukeSearchQuery);
  });

  it('renders empty string when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage(SEARCH_KEY));

    const [value] = result.current;
    expect(value).toBe('');
  });

  it('returns empty string when empty string is stored', () => {
    const { result } = renderHook(() => useLocalStorage(SEARCH_KEY));

    act(() => {
      const [, setValue] = result.current;
      setValue('');
    });

    const [value] = result.current;
    expect(value).toBe('');
  });

  it('overwrites existing search query', () => {
    const { result } = renderHook(() => useLocalStorage(SEARCH_KEY));

    act(() => {
      const [, setValue] = result.current;
      setValue(lukeSearchQuery);
    });
    const [initialValue] = result.current;
    expect(initialValue).toBe(lukeSearchQuery);

    act(() => {
      const [, setValue] = result.current;
      setValue(darthSearchQuery);
    });
    const [overwrittenValue] = result.current;
    expect(overwrittenValue).toBe(darthSearchQuery);
  });
});
