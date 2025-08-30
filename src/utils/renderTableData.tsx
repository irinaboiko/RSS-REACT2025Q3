import type { JSX } from 'react';

import { FlashCell } from '@/components/FlashCell';
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
): JSX.Element => {
  switch (key) {
    case 'name':
      return <FlashCell rawValue={countryName}>{countryName}</FlashCell>;

    case 'iso_code':
      return <FlashCell rawValue={iso_code}>{iso_code ?? 'N/A'}</FlashCell>;

    case 'year': {
      const value = yearData.year.toString() ?? 'N/A';
      return <FlashCell rawValue={value}>{value}</FlashCell>;
    }

    case 'population': {
      const value = yearData.population
        ? formatNumber(yearData.population)
        : 'N/A';
      return <FlashCell rawValue={value}>{value}</FlashCell>;
    }

    default: {
      const value = yearData[key];
      const formattedValue = value ? formatNumber(value, 1) : 'N/A';
      return <FlashCell rawValue={formattedValue}>{formattedValue}</FlashCell>;
    }
  }
};
