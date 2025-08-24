import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { formatDate } from './formatDate';

const ORIGINAL_TZ = process.env.TZ;

beforeAll(() => {
  process.env.TZ = 'UTC';
});

afterAll(() => {
  process.env.TZ = ORIGINAL_TZ;
});

describe('formatDate', () => {
  it('formats ISO string in en-US with month short, 2-digit day/hour/minute', () => {
    const iso = '2025-08-24T10:05:00.000Z';
    expect(formatDate(iso)).toBe('Aug 24, 2025, 10:05 AM');
  });

  it('returns "Invalid Date" for invalid input', () => {
    expect(formatDate('not-an-iso')).toBe('Invalid Date');
  });
});
