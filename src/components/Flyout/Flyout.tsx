import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearAll } from '@/store/selectedPeopleSlice';
import type { PersonPreview } from '@/types/person';
import { downloadCsv } from '@/utils';

export const Flyout = () => {
  const selectedPeople: PersonPreview[] = useAppSelector(
    (state) => state.selectedPeople.people
  );
  const dispatch = useAppDispatch();

  if (selectedPeople.length === 0) return null;

  const handleDownloadClick = () => {
    downloadCsv(selectedPeople);
  };

  return (
    <div className="my-2 flex items-center justify-between gap-3 border-y-1 border-zinc-400 p-1 text-sm">
      <span>
        {selectedPeople.length}{' '}
        {selectedPeople.length === 1 ? 'item is' : 'items are'} selected
      </span>

      <div className="flex items-center gap-3">
        <button className="btn btn-gray" onClick={() => dispatch(clearAll())}>
          Unselect All
        </button>
        <button
          className="btn btn-gray"
          onClick={handleDownloadClick}
          disabled={!selectedPeople.length}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};
