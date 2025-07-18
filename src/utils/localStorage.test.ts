import { describe, it, expect, beforeEach } from 'vitest';
import {
  clearSearchQuery,
  getSearchQuery,
  SEARCH_KEY,
  setSearchQuery,
} from './localStorage';

import { SEARCH_QUERIES } from '../__tests__/testConstants.ts';

const { lukeSearchQuery, darthSearchQuery } = SEARCH_QUERIES;

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('populates search query in localStorage', () => {
    setSearchQuery(lukeSearchQuery);
    expect(getSearchQuery()).toBe(lukeSearchQuery);
  });

  it('clears search query from localStorage', () => {
    setSearchQuery(lukeSearchQuery);
    clearSearchQuery();

    expect(localStorage.getItem(SEARCH_KEY)).toBeNull();
  });

  it('returns empty string when nothing is stored', () => {
    expect(getSearchQuery()).toBe('');
  });

  it('returns empty string when empty string is stored', () => {
    setSearchQuery('');
    expect(getSearchQuery()).toBe('');
  });

  it('overwrites existing search query', () => {
    setSearchQuery(lukeSearchQuery);
    setSearchQuery(darthSearchQuery);

    expect(getSearchQuery()).toBe(darthSearchQuery);
  });
});
