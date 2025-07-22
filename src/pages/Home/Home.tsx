import { useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ResultList } from '@/components/ResultLists';
import { ApiErrorMessage } from '@/components/ApiErrorMessage';
import { SimulateErrorButton } from '@/components/SimulateErrorButton';

import { fetchPeople } from '@/api';
import {
  getSearchQueryFromLocalStorage,
  setSearchQueryToLocalStorage,
} from '@/utils/localStorage';

import type { PersonPreview } from '@/types/person';

export const Home = () => {
  const [people, setPeople] = useState<PersonPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [simulatedError, setSimulatedError] = useState(false);

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

  if (simulatedError) {
    throw new Error('I crashed!');
  }

  return (
    <div className="flex h-screen flex-col px-5 py-4">
      <Header />
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

      <div>
        <SimulateErrorButton onClick={() => setSimulatedError(true)} />
      </div>
    </div>
  );
};
