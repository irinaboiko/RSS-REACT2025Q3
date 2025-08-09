import { describe, it, expect } from 'vitest';

import { getErrorMessage } from '@/utils';

describe('getErrorMessage', () => {
  it('returns "Unknown error" when error is undefined', () => {
    expect(getErrorMessage(undefined)).toBe('Unknown error');
  });

  it('returns message from FetchBaseQueryError', () => {
    const error = {
      status: 404,
      data: { message: 'Not found' },
    };
    expect(getErrorMessage(error)).toBe('Not found');
  });

  it('returns fallback message from FetchBaseQueryError', () => {
    const error = {
      status: 500,
      data: {},
    };
    expect(getErrorMessage(error)).toBe('Request failed with status 500');
  });

  it('returns message from SerializedError', () => {
    const error = {
      message: 'Something went wrong',
      name: 'Error',
      stack: 'stacktrace',
    };
    expect(getErrorMessage(error)).toBe('Something went wrong');
  });

  it('returns fallback message for SerializedError', () => {
    const error = {
      message: '',
      name: 'Error',
      stack: 'stacktrace',
    };
    expect(getErrorMessage(error)).toBe('Serialized error');
  });

  it('returns "Unknown error" for unexpected structure', () => {
    const error = {};
    expect(getErrorMessage(error)).toBe('Unknown error');
  });
});
