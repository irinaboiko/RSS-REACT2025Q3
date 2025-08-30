import { useColumnsSort } from '@/hooks/useColumnsSort';

export const ColumnSortControl = () => {
  const { direction, toggleDirection } = useColumnsSort();

  const image = direction === 'asc' ? 'bars-arrow-up' : 'bars-arrow-down';

  return (
    <button type="button" className="cursor-pointer" onClick={toggleDirection}>
      <img src={`/${image}.svg`} alt="Sort" className="h-4 w-4" />
    </button>
  );
};
