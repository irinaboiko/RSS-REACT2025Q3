import { Component } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface Props {
  onSearch: (query: string) => void;
  searchQuery: string;
  onChange: (query: string) => void;
}

class SearchBar extends Component<Props> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.onSearch(this.props.searchQuery.trim());
  };

  render() {
    return (
      <form
        className="search-bar flex gap-2"
        onSubmit={this.handleSubmit}
        data-testid="search-form"
      >
        <input
          type="text"
          value={this.props.searchQuery}
          onChange={this.handleChange}
          placeholder="Search for Star Wars people..."
          className="flex-1 rounded border-1 border-zinc-400 px-3 py-2"
          data-testid="search-input"
        />
        <button
          type="submit"
          className="btn btn-cyan"
          data-testid="search-button"
        >
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
