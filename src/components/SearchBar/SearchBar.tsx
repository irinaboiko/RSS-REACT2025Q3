import type { ChangeEvent, FormEvent } from 'react';

export interface SearchBarProps {
  inputValue: string;
  onInputChange: (query: string) => void;
  onFormSubmit: (query: string) => void;
}

export default function SearchBar({
  inputValue,
  onInputChange,
  onFormSubmit,
}: SearchBarProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFormSubmit(inputValue.trim());
  };

  return (
    <form className="search-bar flex gap-2" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for Star Wars people..."
        className="flex-1 rounded border-1 border-zinc-400 px-3 py-2"
      />
      <button type="submit" className="btn btn-gray">
        Search
      </button>
    </form>
  );
}
