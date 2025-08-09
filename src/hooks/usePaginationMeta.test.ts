import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { usePaginationMeta } from '@/hooks/usePaginationMeta';
import { RESULTS_PER_PAGE } from '@/constants/common';
import type { PersonPreview } from '@/types/person';
import { mockPeopleArray } from '@/__tests__/mocks/peopleMocks';

const mockPeople: PersonPreview[] = mockPeopleArray;

describe('usePaginationMeta', () => {
  it('returns searchedData when isSearching is true', () => {
    const currentPage = 2;
    const { result } = renderHook(() =>
      usePaginationMeta({
        isSearching: true,
        currentPage,
        searchedData: mockPeople,
        allPeopleData: { data: [], totalPages: 1 },
      })
    );

    const start = (currentPage - 1) * RESULTS_PER_PAGE;
    const end = currentPage * RESULTS_PER_PAGE;

    expect(result.current.people).toEqual(mockPeople.slice(start, end));
    expect(result.current.totalPages).toBe(
      Math.ceil(mockPeople.length / RESULTS_PER_PAGE)
    );
  });

  it('returns allPeopleData when isSearching is false', () => {
    const { result } = renderHook(() =>
      usePaginationMeta({
        isSearching: false,
        currentPage: 1,
        allPeopleData: { data: mockPeople, totalPages: 1 },
      })
    );

    expect(result.current.people).toEqual(mockPeople);
    expect(result.current.totalPages).toBe(1);
  });

  it('returns empty allPeopleData data when isSearching is true', () => {
    const { result } = renderHook(() =>
      usePaginationMeta({
        isSearching: true,
        currentPage: 1,
      })
    );

    expect(result.current.people).toEqual([]);
    expect(result.current.totalPages).toBe(0);
  });
});
