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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const [searchQuery, setSearchQuery] = useLocalStorage(SEARCH_KEY);

  const [params, setParams] = useState<{ searchQuery: string; page: number }>({
    searchQuery,
    page: currentPage,
  });

  const [searchInputValue, setSearchInputValue] = useState<string>(searchQuery);
  const [people, setPeople] = useState<PersonPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (params.searchQuery === '') {
          const { data, totalPages } = await fetchAllPeople(params.page);
          setPeople(data);
          setTotalPages(totalPages);
        } else {
          const data = await fetchSearchedPeople(params.searchQuery);
          setTotalPages(Math.ceil(data.length / RESULTS_PER_PAGE));
          const start = (params.page - 1) * RESULTS_PER_PAGE;
          const end = start + RESULTS_PER_PAGE;
          setPeople(data.slice(start, end));

          if (data.length === 0) {
            setSearchParams({});
          }
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params]);

  const handleSearchFormSubmit = (value: string) => {
    setSearchQuery(value);
    setParams({ searchQuery: value, page: 1 });
    setSearchInputValue(value);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
    setSearchParams({ page: String(page) });
  };

  return (
    <>
      <SearchBar
        inputValue={searchInputValue}
        onInputChange={setSearchInputValue}
        onFormSubmit={handleSearchFormSubmit}
      />

      <div className="grow pt-4">
        {error ? (
          <ApiErrorMessage errorMessage={error} />
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex grow flex-row">
              <div className="relative flex flex-1 flex-col">
                <ResultList people={people} loading={loading} />
                {people.length > 0 && (
                  <Pagination
                    currentPage={params.page}
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
