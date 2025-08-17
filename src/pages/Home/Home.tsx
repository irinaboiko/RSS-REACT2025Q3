import { useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';

import SearchBar from '@/components/SearchBar/SearchBar';
import ResultList from '@/components/ResultList/ResultList';
import Pagination from '@/components/Pagination/Pagination';
import ApiErrorMessage from '@/components/ApiErrorMessage/ApiErrorMessage';

import {
  useGetAllPeopleQuery,
  useGetSearchedPeopleQuery,
} from '@/services/people';
import {
  useLocalStorage,
  usePaginationMeta,
  usePeopleQueryMeta,
} from '@/hooks';
import { RESULTS_PER_PAGE, SEARCH_KEY } from '@/constants/common';
import { getErrorMessage } from '@/utils';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const [searchQuery, setSearchQuery] = useLocalStorage(SEARCH_KEY);
  const [searchInputValue, setSearchInputValue] = useState<string>(searchQuery);

  const isSearching = !!searchQuery;

  const {
    data: allPeopleData,
    isFetching: isAllPeopleLoading,
    error: allPeopleError,
    refetch: allPeopleRefetch,
  } = useGetAllPeopleQuery(
    { page: currentPage, limit: RESULTS_PER_PAGE },
    { skip: isSearching }
  );

  const {
    data: searchedData,
    isFetching: isSearchingLoading,
    error: searchingError,
    refetch: searchingRefetch,
  } = useGetSearchedPeopleQuery(searchQuery, {
    skip: !isSearching,
  });

  const { people, totalPages } = usePaginationMeta({
    isSearching,
    currentPage,
    searchedData,
    allPeopleData,
  });

  const { isLoading, error } = usePeopleQueryMeta({
    isSearching,
    isSearchingLoading,
    isAllPeopleLoading,
    searchingError,
    allPeopleError,
  });

  const handleSearchFormSubmit = (value: string) => {
    setSearchQuery(value);
    setSearchInputValue(value);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const handleRefresh = () =>
    isSearching ? searchingRefetch() : allPeopleRefetch();

  return (
    <>
      <SearchBar
        inputValue={searchInputValue}
        onInputChange={setSearchInputValue}
        onFormSubmit={handleSearchFormSubmit}
      />

      <div className="grow pt-4">
        <div className="flex h-full flex-col">
          <div className="flex grow flex-row">
            <div className="relative flex flex-1 flex-col">
              <button
                onClick={handleRefresh}
                aria-label="refresh"
                className="btn btn-gray self-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>

              {error ? (
                <ApiErrorMessage errorMessage={getErrorMessage(error)} />
              ) : (
                <>
                  <ResultList people={people} />
                  {people.length > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
