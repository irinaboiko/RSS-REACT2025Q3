import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { fetchPeople } from '@/utils/api';

import {
  mockApiResponseWithoutSearchQuery,
  mockApiResponseWithSearchQuery,
  expectedPeopleWithoutSearchQuery,
  expectedPeopleWithSearchQuery,
  mockApiResponseWithInvalidSearchQuery,
} from '@/__tests__/mocks/apiMocks';

import { SEARCH_QUERIES, MESSAGES } from '@/__tests__/testConstants';

const { lukeSearchQuery, invalidSearchQuery } = SEARCH_QUERIES;
const { apiBadRequest } = MESSAGES;

describe('api', () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches data with empty search term', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockApiResponseWithoutSearchQuery),
    });

    const result = await fetchPeople('');

    expect(fetch).toHaveBeenCalledWith('https://swapi.tech/api/people/');
    expect(result).toEqual(expectedPeopleWithoutSearchQuery);
  });

  it('fetches data with search term', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockApiResponseWithSearchQuery),
    });

    const result = await fetchPeople(lukeSearchQuery);

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.tech/api/people/?name=luke'
    );
    expect(result).toEqual(expectedPeopleWithSearchQuery);
  });

  it('returns empty array for invalid search term', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockApiResponseWithInvalidSearchQuery),
    });

    const result = await fetchPeople(invalidSearchQuery);

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.tech/api/people/?name=invalid'
    );
    expect(result).toEqual([]);
  });

  it('returns empty array if API response has no results', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ message: 'ok' }),
    });

    const result = await fetchPeople(invalidSearchQuery);

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.tech/api/people/?name=invalid'
    );
    expect(result).toEqual([]);
  });

  it('throws an error if response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    });

    await expect(() => fetchPeople('Invalid')).rejects.toThrow(apiBadRequest);
  });
});
