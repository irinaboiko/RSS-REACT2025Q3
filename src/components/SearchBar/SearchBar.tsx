import type { ChangeEvent, FormEvent } from 'react';

interface Props {
  onSearch: (query: string) => void;
  searchQuery: string;
  onChange: (query: string) => void;
}

export const SearchBar = (props: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSearch(props.searchQuery.trim());
  };

  return (
    <form
      className="search-bar flex gap-2"
      onSubmit={handleSubmit}
      data-testid="search-form"
    >
      <input
        type="text"
        value={props.searchQuery}
        onChange={handleChange}
        placeholder="Search for Star Wars people..."
        className="flex-1 rounded border-1 border-zinc-400 px-3 py-2"
        data-testid="search-input"
      />
      <button
        type="submit"
        className="btn btn-gray"
        data-testid="search-button"
      >
        Search
      </button>
    </form>
  );
};
