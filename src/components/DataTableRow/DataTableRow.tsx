import type { CountryData, YearRow } from '@/types/table';
import { formatNumber } from '@/utils/formatNumber';

export interface DataTableRowProps {
  countryName: string;
  countryData: CountryData;
}

export const DataTableRow = ({
  countryName,
  countryData,
}: DataTableRowProps) => {
  const latestYearData: YearRow = countryData.data[countryData.data.length - 1];

  return (
    <>
      <div className="grid grid-cols-3 border-gray-200 px-2 py-3 not-last:border-b-1">
        <div className="flex gap-1 pr-2">{countryName}</div>
        <div className="pr-2">
          {latestYearData.population
            ? formatNumber(latestYearData.population)
            : 'N/A'}
        </div>
        <div>{countryData.iso_code ?? 'N/A'}</div>
      </div>
    </>
  );
};
