import type { SortDirection } from '@/types/table';

export const sortColumn = (
  arr: string[],
  direction: SortDirection = 'asc'
): string[] => {
  const dir = direction === 'desc' ? -1 : 1;
  return [...arr].sort((a, b) => dir * a.localeCompare(b));
};
