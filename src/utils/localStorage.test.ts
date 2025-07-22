import { describe, it, expect, beforeEach } from 'vitest';
import {
  clearSearchQueryFromLocalStorage,
  getSearchQueryFromLocalStorage,
  SEARCH_KEY,
  setSearchQueryToLocalStorage,
} from './localStorage';

import { SEARCH_QUERIES } from '@/__tests__/testConstants';

const { lukeSearchQuery, darthSearchQuery } = SEARCH_QUERIES;

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('populates search query in localStorage', () => {
    setSearchQueryToLocalStorage(lukeSearchQuery);
    expect(getSearchQueryFromLocalStorage()).toBe(lukeSearchQuery);
  });

  it('clears search query from localStorage', () => {
    setSearchQueryToLocalStorage(lukeSearchQuery);
    clearSearchQueryFromLocalStorage();

    expect(localStorage.getItem(SEARCH_KEY)).toBeNull();
  });

  it('returns empty string when nothing is stored', () => {
    expect(getSearchQueryFromLocalStorage()).toBe('');
  });

  it('returns empty string when empty string is stored', () => {
    setSearchQueryToLocalStorage('');
    expect(getSearchQueryFromLocalStorage()).toBe('');
  });

  it('overwrites existing search query', () => {
    setSearchQueryToLocalStorage(lukeSearchQuery);
    setSearchQueryToLocalStorage(darthSearchQuery);

    expect(getSearchQueryFromLocalStorage()).toBe(darthSearchQuery);
  });
});
