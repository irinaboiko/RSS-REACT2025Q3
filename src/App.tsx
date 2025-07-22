import { useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ResultList } from '@/components/ResultLists';
import { ApiErrorMessage } from '@/components/error/ApiErrorMessage';
import { SimulateErrorButton } from '@/components/ui/SimulateErrorButton';

import { fetchPeople } from './utils/api';
import {
  getSearchQueryFromLocalStorage,
  setSearchQueryToLocalStorage,
} from './utils/localStorage';

import type { PersonPreview } from './types/person.ts';

export const App = () => {
  const [people, setPeople] = useState<PersonPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [simulatedError, setSimulatedError] = useState(false);

  useEffect(() => {
    setSearchQuery(getSearchQueryFromLocalStorage());

    handleSearch();
  }, []);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    setSearchQueryToLocalStorage(trimmedQuery);
    setLoading(true);
    setSearchQuery(trimmedQuery);
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

  if (simulatedError) {
    throw new Error('I crashed!');
  }

  return (
    <div className="flex h-screen flex-col px-5 py-4">
      <Header />
      <SearchBar
        onSearch={handleSearch}
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
