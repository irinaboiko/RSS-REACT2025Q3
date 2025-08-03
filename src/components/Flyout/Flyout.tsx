import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearAll } from '@/store/selectedPeopleSlice';
import type { PersonPreview } from '@/types/person';
import { generateCsvBlob } from '@/utils';

export const Flyout = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileNameRef = useRef<string>('');
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const selectedPeople: PersonPreview[] = useAppSelector(
    (state) => state.selectedPeople.people
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (downloadUrl && downloadRef.current) {
      downloadRef.current.click();
    }

    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(null);
      }
    };
  }, [downloadUrl]);

  if (selectedPeople.length === 0) return null;

  const handleDownloadClick = () => {
    const { blob, fileName } = generateCsvBlob(selectedPeople);
    fileNameRef.current = fileName;

    const url = URL.createObjectURL(blob);

    setDownloadUrl(url);
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
        <a
          ref={downloadRef}
          href={downloadUrl as string}
          download={fileNameRef.current}
          style={{ display: 'none' }}
        >
          Hidden download link
        </a>
      </div>
    </div>
  );
};
