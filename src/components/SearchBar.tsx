import { type ChangeEvent, Component, type FormEvent } from 'react';

interface Props {
  onSearch: (query: string) => void;
  searchQuery: string;
}

interface State {
  searchQuery: string;
}

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchQuery: this.props.searchQuery || '' };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.onSearch(this.state.searchQuery);
  };

  render() {
    return (
      <form className="search-bar flex gap-2 p-4" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={this.handleChange}
          placeholder="Search for Star Wars people..."
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
