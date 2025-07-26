import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';

import { SearchBar } from '@/components/SearchBar';
import { ResultList } from '@/components/ResultLists';
import { Pagination } from '@/components/Pagination';
import { ApiErrorMessage } from '@/components/ApiErrorMessage';

import { fetchAllPeople, fetchSearchedPeople } from '@/api';
import { useLocalStorage } from '@/hooks';
import type { PersonPreview } from '@/types/person';
import { RESULTS_PER_PAGE, SEARCH_KEY } from '@/constants/common';

export const Home = () => {
  const [people, setPeople] = useState<PersonPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  // client side pagination for searched results
  const [searchCurrentPage, setSearchCurrentPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(SEARCH_KEY);

  const currentPage: number = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setSearchQuery(localStorageValue);
    setSearchInputValue(localStorageValue);

    performSearch(localStorageValue);
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchCurrentPage(currentPage);
      performSearch('');
    }
  }, [currentPage]);

  const performSearch = (query: string) => {
    if (query === '') {
      loadAllData(currentPage);
    } else {
      loadSearchedData(query);
    }
  };

  const loadAllData = (currentPage: number) => {
    setLoading(true);
    setError(null);

    fetchAllPeople(currentPage)
      .then(({ data, totalPages }) => {
        setPeople(data);
        setTotalPages(totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const loadSearchedData = (query: string) => {
    setLoading(true);
    setError(null);

    fetchSearchedPeople(query)
      .then((data) => {
        setPeople(data);
        setTotalPages(Math.ceil(data.length / RESULTS_PER_PAGE));
        setLoading(false);

        if (data.length === 0) {
          setSearchParams({});
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSearchInputValueChange = (value: string) => {
    setSearchInputValue(value);
  };

  const handleSearchFormSubmit = (searchValue: string) => {
    setSearchQuery(searchValue);
    setLocalStorageValue(searchValue);
    setSearchInputValue(searchValue);

    // client side pagination for searched results
    setSearchParams({ page: '1' });
    setSearchCurrentPage(1);

    performSearch(searchValue);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });

    if (searchQuery === '') {
      loadAllData(page);
    } else {
      setSearchCurrentPage(page);
    }
  };

  // client side pagination for searched results
  const getPaginatedData = (data: PersonPreview[], page: number) => {
    const start = (page - 1) * RESULTS_PER_PAGE;
    const end = start + RESULTS_PER_PAGE;
    return data.slice(start, end);
  };

  const displayedPeople =
    searchQuery === '' ? people : getPaginatedData(people, searchCurrentPage);

  return (
    <>
      <SearchBar
        inputValue={searchInputValue}
        onInputChange={(value: string) => handleSearchInputValueChange(value)}
        onFormSubmit={(searchValue: string) =>
          handleSearchFormSubmit(searchValue)
        }
      />

      <div className="grow pt-4">
        {error ? (
          <ApiErrorMessage errorMessage={error} />
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex grow flex-row">
              <div className="relative flex flex-1 flex-col">
                <ResultList people={displayedPeople} loading={loading} />
                {people?.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>

              <Outlet />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
