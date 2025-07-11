import { Component } from 'react';

import Header from './components/Header.tsx';
import SearchBar from './components/SearchBar.tsx';
import ResultList from './components/ResultLists.tsx';
import ApiErrorMessage from './error/ApiErrorMessage.tsx';
import SimulateErrorButton from './components/ui/SimulateErrorButton.tsx';

import { fetchPeople } from './utils/api.ts';
import { getSearchQuery, setSearchQuery } from './utils/localStorage.ts';
import type { PersonPreview } from './types/person.ts';

interface AppState {
  people: PersonPreview[];
  loading: boolean;
  searchQuery: string;
  error: string | null;
  simulatedError: boolean;
}

class App extends Component {
  state: AppState = {
    people: [],
    loading: false,
    searchQuery: getSearchQuery(),
    error: null,
    simulatedError: false,
  };

  componentDidMount(): void {
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

  render() {
    const { people, loading, searchQuery, error, simulatedError } = this.state;

    if (simulatedError) {
      throw new Error('I crashed!');
    }

    return (
      <div className="flex h-screen flex-col px-5 py-4">
        <Header />
        <SearchBar onSearch={this.handleSearch} searchQuery={searchQuery} />

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

export default App;
