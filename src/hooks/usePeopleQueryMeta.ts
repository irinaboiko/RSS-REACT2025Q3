import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export interface UsePeopleQueryMetaParams {
  isSearching: boolean;
  isSearchingLoading: boolean;
  isAllPeopleLoading: boolean;
  searchingError: FetchBaseQueryError | SerializedError | undefined;
  allPeopleError: FetchBaseQueryError | SerializedError | undefined;
}

export const usePeopleQueryMeta = ({
  isSearching,
  isSearchingLoading,
  isAllPeopleLoading,
  searchingError,
  allPeopleError,
}: UsePeopleQueryMetaParams) => {
  const isLoading = isSearching ? isSearchingLoading : isAllPeopleLoading;

  const error = isSearching ? searchingError : allPeopleError;

  return { isLoading, error };
};
