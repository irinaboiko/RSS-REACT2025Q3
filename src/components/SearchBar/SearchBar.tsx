import { useSearchBar } from '@/hooks/useSearchBar';

export const SearchBar = () => {
  const { searchValue, onSearchChange, clearSearchValue } = useSearchBar();

  return (
    <div className="flex items-center gap-2 border-1 border-gray-200 pr-2 text-sm">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search Country"
        className="p-1 pl-3"
      />
      <button onClick={clearSearchValue} className="h-4 w-4 cursor-pointer">
        <img src="/x-mark.svg" alt="Clear" />
      </button>
    </div>
  );
};
