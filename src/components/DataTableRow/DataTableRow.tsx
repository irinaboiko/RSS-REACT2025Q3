import { memo, useMemo } from 'react';

import { useSelectedColumns } from '@/hooks/useSelectedColumns';
import { useYearSelection } from '@/hooks/useYearSelection';
import { renderCell } from '@/utils/renderTableData';
import type { CountryData, YearRow } from '@/types/table';

export interface DataTableRowProps {
  countryName: string;
  countryData: CountryData;
}

export const DataTableRow = memo(function DataTableRow({
  countryName,
  countryData,
}: DataTableRowProps) {
  const { currentYear } = useYearSelection();
  const { selectedColumns } = useSelectedColumns();

  let currentYearData: YearRow | undefined;

  currentYearData = useMemo(
    () => countryData.data.find((yearData) => yearData.year === currentYear),
    [countryData.data, currentYear]
  );

  if (!currentYearData) {
    currentYearData = {
      year: currentYear,
      population: null,
      co2: null,
      co2_per_capita: null,
    };
  }

  const rowStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${selectedColumns.length}, minmax(0, 1fr))`,
    }),
    [selectedColumns.length]
  );

  const rowClassName = `grid border-gray-200 py-3 not-last:border-b-1 odd:bg-gray-100`;

  return (
    <>
      <div className={rowClassName} style={rowStyle}>
        {selectedColumns.map((key) => (
          <div key={key} className="border-gray-200 px-2 not-last:border-r-1">
            {renderCell(
              key,
              countryName,
              countryData.iso_code,
              currentYearData
            )}
          </div>
        ))}
      </div>
    </>
  );
});
