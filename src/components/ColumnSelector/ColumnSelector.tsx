import { memo, useState } from 'react';

import { ColumnSelectorModal } from '@/components/ColumnSelectorModal';

export const ColumnSelector = memo(function ColumnSelector() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300"
      >
        <img
          src="/view-columns.svg"
          alt="Select additional columns"
          className="h-5 w-5"
        />
      </button>
      {isOpen && <ColumnSelectorModal />}
    </div>
  );
});
