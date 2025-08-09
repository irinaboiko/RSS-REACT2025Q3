import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string {
  if (!error) return 'Unknown error';

  if ('status' in error) {
    const errData = error.data as { message?: string };
    return errData?.message || `Request failed with status ${error.status}`;
  }

  if ('message' in error) {
    return error.message || 'Serialized error';
  }

  return 'Unknown error';
}
