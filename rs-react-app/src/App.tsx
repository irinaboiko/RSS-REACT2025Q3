import SearchBar from './components/SearchBar.tsx';
import ResultList from './components/ResultLists.tsx';
import { Component } from 'react';
import { fetchPeople } from './utils/api.ts';
import type { Person } from './types/person.ts';

interface Props {}

interface AppState {
  people: Person[];
  loading: boolean;
}

class App extends Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      people: [],
      loading: false,
    };
  }

  componentDidMount(): void {
    this.setState({ loading: true });

    fetchPeople('')
      .then((results) => {
        this.setState({ people: results, loading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { people, loading } = this.state;

    return (
      <>
        <SearchBar />
        <ResultList people={people} loading={loading} />
      </>
    );
  }
}

export default App;
