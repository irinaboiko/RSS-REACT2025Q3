import { YearsTableHeader } from '@/components/YearsTableHeader';
import { YearsTableRow } from '@/components/YearsTableRow';
import type { CountryData, YearRow } from '@/types/table';

export interface YearsTableProps {
  countryData: CountryData;
}

export const YearsTable = ({ countryData }: YearsTableProps) => {
  const reversedData = countryData.data.slice().reverse();

  return (
    <div className="border-gray-200 bg-gray-100 p-6 not-last:border-b-1">
      <div className="relative max-h-120 overflow-y-auto rounded-lg border-1 border-gray-200 bg-gray-50">
        <YearsTableHeader />

        {reversedData.map((year: YearRow) => (
          <YearsTableRow key={year.year} yearData={year} />
        ))}
      </div>
    </div>
  );
};
