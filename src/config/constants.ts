import type { ColumnKey } from '@/config/columns';

export const MIN_YEAR = 1750;
export const MAX_YEAR = 2023;
export const YEARS: number[] = Array.from(
  { length: MAX_YEAR - MIN_YEAR + 1 },
  (_, i) => MAX_YEAR - i
);

export const SORTABLE_COLUMNS: ColumnKey[] = ['name'];
