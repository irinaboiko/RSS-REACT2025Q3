import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { usePeopleQueryMeta } from '@/hooks/usePeopleQueryMeta';

describe('usePeopleQueryMeta', () => {
  it('returns searching loading and error when isSearching is true', () => {
    const { result } = renderHook(() =>
      usePeopleQueryMeta({
        isSearching: true,
        isSearchingLoading: true,
        isAllPeopleLoading: false,
        searchingError: { status: 404, data: 'Not found' },
        allPeopleError: undefined,
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toEqual({ status: 404, data: 'Not found' });
  });

  it('returns default loading and error when isSearching is false', () => {
    const { result } = renderHook(() =>
      usePeopleQueryMeta({
        isSearching: false,
        isSearchingLoading: false,
        isAllPeopleLoading: true,
        searchingError: undefined,
        allPeopleError: { status: 500, data: 'Server error' },
      })
    );

    expect(result.current.error).toEqual({ status: 500, data: 'Server error' });
  });

  it('returns undefined when no error is present', () => {
    const { result } = renderHook(() =>
      usePeopleQueryMeta({
        isSearching: true,
        isSearchingLoading: false,
        isAllPeopleLoading: false,
        searchingError: undefined,
        allPeopleError: undefined,
      })
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});
