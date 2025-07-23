import { useEffect, useState } from 'react';

import { SearchBar } from '@/components/SearchBar';
import { ResultList } from '@/components/ResultLists';
import { ApiErrorMessage } from '@/components/ApiErrorMessage';

import { fetchPeople } from '@/api';
import { useLocalStorage } from '@/hooks';
import type { PersonPreview } from '@/types/person';

export const Home = () => {
  const [people, setPeople] = useState<PersonPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const { getSearchQueryFromLocalStorage, setSearchQueryToLocalStorage } =
    useLocalStorage();

  useEffect(() => {
    const storedQuery = getSearchQueryFromLocalStorage();
    setSearchQuery(storedQuery);
    performSearch(storedQuery);
  }, []);

  const performSearch = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchQueryToLocalStorage(trimmedQuery);
    setLoading(true);
    setError(null);

    fetchPeople(trimmedQuery)
      .then((results) => {
        setPeople(results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchClick = () => {
    performSearch(searchQuery);
  };

  return (
    <>
      <SearchBar
        onSearch={handleSearchClick}
        searchQuery={searchQuery}
        onChange={handleQueryChange}
      />

      <div className="grow pt-4">
        {error ? (
          <ApiErrorMessage errorMessage={error} />
        ) : (
          <ResultList people={people} loading={loading} />
        )}
      </div>
    </>
  );
};
