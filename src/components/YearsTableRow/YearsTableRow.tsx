import type { YearRow } from '@/types/table';
import { formatNumber } from '@/utils/formatNumber';

export interface YearsTableRowProps {
  yearData: YearRow;
}

export const YearsTableRow = ({ yearData }: YearsTableRowProps) => {
  return (
    <div className="grid grid-cols-4 border-gray-200 px-2 py-3 not-last:border-b-1">
      <div>{yearData.year ?? 'N/A'}</div>
      <div>
        {yearData.population ? formatNumber(yearData.population) : 'N/A'}
      </div>
      <div>{yearData.co2 ? formatNumber(yearData.co2, 2) : 'N/A'}</div>
      <div>
        {yearData.co2_per_capita
          ? formatNumber(yearData.co2_per_capita, 2)
          : 'N/A'}
      </div>
    </div>
  );
};
