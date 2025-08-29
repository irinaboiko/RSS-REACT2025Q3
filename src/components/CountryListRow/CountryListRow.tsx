import { useState } from 'react';
import clsx from 'clsx';

import { YearsTable } from '@/components/YearsTable';
import type { CountryData, YearRow } from '@/types/table';
import { formatNumber } from '@/utils/formatNumber';

export interface CountryBlockProps {
  countryName: string;
  countryData: CountryData;
}

export const CountryListRow = ({
  countryName,
  countryData,
}: CountryBlockProps) => {
  const [isYearsDataOpen, setIsYearsDataOpen] = useState<boolean>(false);

  const latestYearData: YearRow = countryData.data[countryData.data.length - 1];

  return (
    <>
      <div className="grid grid-cols-3 border-gray-200 px-2 py-3 not-last:border-b-1">
        <div className="flex gap-1 pr-2">
          <button
            type="button"
            onClick={() => setIsYearsDataOpen((prev) => !prev)}
          >
            <img
              src="/chevron-left.svg"
              alt="Show arrow"
              className={clsx('h-5 w-5', isYearsDataOpen && 'rotate-90')}
            />
          </button>
          {countryName}
        </div>
        <div className="pr-2">
          {latestYearData.population
            ? formatNumber(latestYearData.population)
            : 'N/A'}
        </div>
        <div>{countryData.iso_code ?? 'N/A'}</div>
      </div>

      {isYearsDataOpen && <YearsTable countryData={countryData} />}
    </>
  );
};
