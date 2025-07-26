import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { fetchAllPeople, fetchSearchedPeople, fetchPersonDetails } from '@/api';

import {
  mockApiResponseWithoutSearchQuery,
  mockApiResponseWithSearchQuery,
  mockApiResponseWithInvalidSearchQuery,
  mockPersonDetailsResponse,
} from '@/__tests__/mocks/apiMocks';

import { SEARCH_QUERIES, MESSAGES } from '@/__tests__/testConstants';
import { lukeSkywalker } from '@/__tests__/mocks/peopleMocks';

const { lukeSearchQuery, invalidSearchQuery } = SEARCH_QUERIES;
const { apiBadRequest } = MESSAGES;

describe('people API', () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('fetchAllPeople', () => {
    it('fetches all people', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponseWithoutSearchQuery),
      });

      const result = await fetchAllPeople();

      expect(fetch).toHaveBeenCalledWith(
        'https://swapi.tech/api/people?page=1&limit=10'
      );
      expect(result).toEqual({
        data: mockApiResponseWithoutSearchQuery.results,
        totalPages: mockApiResponseWithoutSearchQuery.total_pages,
      });
    });

    it('throws an error if response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      });

      await expect(fetchAllPeople()).rejects.toThrow(apiBadRequest);
    });
  });

  describe('fetchSearchedPeople', () => {
    it('fetches and maps search result correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponseWithSearchQuery),
      });

      const result = await fetchSearchedPeople(lukeSearchQuery);

      expect(fetch).toHaveBeenCalledWith(
        'https://swapi.tech/api/people?name=luke'
      );
      expect(result).toEqual([lukeSkywalker]);
    });

    it('returns empty array if search result is undefined', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockApiResponseWithInvalidSearchQuery),
      });

      const result = await fetchSearchedPeople(invalidSearchQuery);

      expect(fetch).toHaveBeenCalledWith(
        'https://swapi.tech/api/people?name=invalid'
      );
      expect(result).toEqual([]);
    });

    it('throws an error if response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      });

      await expect(fetchSearchedPeople('fail')).rejects.toThrow(apiBadRequest);
    });
  });

  describe('fetchPersonDetails', () => {
    it('fetches and returns person details', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockPersonDetailsResponse),
      });

      const result = await fetchPersonDetails(1);

      expect(fetch).toHaveBeenCalledWith('https://swapi.tech/api/people/1');
      expect(result).toEqual(mockPersonDetailsResponse.result);
    });

    it('throws an error if response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      });

      await expect(fetchPersonDetails(1)).rejects.toThrow(apiBadRequest);
    });
  });
});
