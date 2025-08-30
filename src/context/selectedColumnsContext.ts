import { createContext } from 'react';

import type { ColumnKey } from '@/config/columns';

export interface SelectedColumnsContextType {
  selectedColumns: ColumnKey[];
  toggleColumn: (key: ColumnKey, required: boolean) => void;
}

export const SelectedColumnsContext =
  createContext<SelectedColumnsContextType | null>(null);
