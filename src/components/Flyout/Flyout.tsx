import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearAll } from '@/store/selectedPeopleSlice';

export const Flyout = () => {
  const selectedPeople = useAppSelector((state) => state.selectedPeople.people);
  const dispatch = useAppDispatch();

  if (selectedPeople.length === 0) return null;

  const handleDownloadClick = () => {
    console.log(`DOWNLOAD ${selectedPeople.length} selected items`);
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
