import { Component } from 'react';

import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ResultList } from '@/components/ResultLists';
import { ApiErrorMessage } from '@/components/error/ApiErrorMessage';
import { SimulateErrorButton } from '@/components/ui/SimulateErrorButton';

import { fetchPeople } from './utils/api';
import { getSearchQuery, setSearchQuery } from './utils/localStorage';

import type { PersonPreview } from './types/person.ts';

interface AppState {
  people: PersonPreview[];
  loading: boolean;
  searchQuery: string;
  error: string | null;
  simulatedError: boolean;
}

export class App extends Component {
  state: AppState = {
    people: [],
    loading: false,
    searchQuery: '',
    error: null,
    simulatedError: false,
  };

  componentDidMount(): void {
    this.setState({ searchQuery: getSearchQuery() });

    this.handleSearch(this.state.searchQuery);
  }

  handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    this.setState({ loading: true, searchQuery: trimmedQuery, error: null });

    fetchPeople(trimmedQuery)
      .then((results) => {
        this.setState({ people: results, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false, error: error.message });
      });
  };

  handleQueryChange = (query: string) => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { people, loading, searchQuery, error, simulatedError } = this.state;

    if (simulatedError) {
      throw new Error('I crashed!');
    }

    return (
      <div className="flex h-screen flex-col px-5 py-4">
        <Header />
        <SearchBar
          onSearch={this.handleSearch}
          searchQuery={searchQuery}
          onChange={this.handleQueryChange}
        />

        <div className="grow pt-4">
          {error ? (
            <ApiErrorMessage errorMessage={error} />
          ) : (
            <ResultList people={people} loading={loading} />
          )}
        </div>

        <div>
          <SimulateErrorButton
            onClick={() => this.setState({ simulatedError: true })}
          />
        </div>
      </div>
    );
  }
}
