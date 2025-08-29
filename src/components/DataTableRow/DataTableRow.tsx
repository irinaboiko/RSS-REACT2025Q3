import { useSelectedColumns } from '@/hooks/useSelectedColumns';
import type { CountryData, YearRow } from '@/types/table';
import { renderCell } from '@/utils/renderTableData';

export interface DataTableRowProps {
  countryName: string;
  countryData: CountryData;
}

export const DataTableRow = ({
  countryName,
  countryData,
}: DataTableRowProps) => {
  const { selectedColumns } = useSelectedColumns();

  const latestYearData: YearRow = countryData.data[countryData.data.length - 1];

  const rowStyle = {
    gridTemplateColumns: `repeat(${selectedColumns.length}, minmax(0, 1fr))`,
  };
  const rowClassName = `grid border-gray-200 py-3 not-last:border-b-1 odd:bg-gray-100`;

  return (
    <>
      <div className={rowClassName} style={rowStyle}>
        {selectedColumns.map((key) => (
          <div key={key} className="border-gray-200 px-2 not-last:border-r-1">
            {renderCell(key, countryName, countryData.iso_code, latestYearData)}
          </div>
        ))}
      </div>
    </>
  );
};
