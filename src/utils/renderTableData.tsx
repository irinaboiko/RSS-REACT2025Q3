import { COLUMNS } from '@/config/columns';
import { formatNumber } from '@/utils/formatNumber';
import { type ColumnKey } from '@/config/columns';
import type { YearRow } from '@/types/table';

export const getLabelByKey = (key: ColumnKey): string | undefined => {
  return COLUMNS.find((col) => col.key === key)?.label;
};

export const renderCell = (
  key: ColumnKey,
  countryName: string,
  iso_code: string | undefined,
  yearData: YearRow
): string => {
  switch (key) {
    case 'name':
      return countryName;

    case 'iso_code':
      return iso_code ?? 'N/A';

    case 'year':
      return yearData.year.toString() ?? 'N/A';

    case 'population':
      return yearData.population != null
        ? formatNumber(yearData.population)
        : 'N/A';

    default: {
      const value = yearData[key];
      return value ? formatNumber(value, 1) : 'N/A';
    }
  }
};
