import { Component } from 'react';

import Header from './components/Header.tsx';
import SearchBar from './components/SearchBar.tsx';
import ResultList from './components/ResultLists.tsx';

import { fetchPeople } from './utils/api.ts';
import { getSearchQuery, setSearchQuery } from './utils/localStorage.ts';
import type { PersonPreview } from './types/person.ts';

interface AppState {
  people: PersonPreview[];
  loading: boolean;
  searchQuery: string;
}

class App extends Component {
  state: AppState = {
    people: [],
    loading: false,
    searchQuery: getSearchQuery(),
  };

  componentDidMount(): void {
    this.handleSearch(this.state.searchQuery);
  }

  handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    this.setState({ loading: true, searchQuery: trimmedQuery });

    fetchPeople(trimmedQuery)
      .then((results) => {
        this.setState({ people: results, loading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { people, loading, searchQuery } = this.state;

    return (
      <div className="h-screen">
        <Header />
        <SearchBar onSearch={this.handleSearch} searchQuery={searchQuery} />
        <ResultList people={people} loading={loading} />
      </div>
    );
  }
}

export default App;
