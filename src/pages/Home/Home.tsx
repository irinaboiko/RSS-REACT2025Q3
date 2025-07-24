import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { SearchBar } from '@/components/SearchBar';
import { ResultList } from '@/components/ResultLists';
import { Pagination } from '@/components/Pagination';
import { ApiErrorMessage } from '@/components/ApiErrorMessage';

import { fetchAllPeople, fetchSearchedPeople } from '@/api';
import { useLocalStorage } from '@/hooks';
import type { PersonPreview } from '@/types/person';

export const Home = () => {
  const [people, setPeople] = useState<PersonPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const { getSearchQueryFromLocalStorage, setSearchQueryToLocalStorage } =
    useLocalStorage();

  const currentPage: number = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const initialSearchQuery = getSearchQueryFromLocalStorage();

    setSearchInputValue(initialSearchQuery);

    performSearch(initialSearchQuery);
  }, []);

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
        setLoading(false);
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
    setSearchQueryToLocalStorage(searchValue);
    setSearchInputValue(searchValue);

    performSearch(searchValue);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });

    loadAllData(page);
  };

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
            <ResultList people={people} loading={loading} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};
