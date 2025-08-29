import { useState } from 'react';
import { type ReactNode } from 'react';

import { SelectedColumnsContext } from '@/context/selectedColumnsContext';
import { REQUIRED_KEYS } from '@/config/columns';
import type { ColumnKey } from '@/config/columns';

export interface SelectedColumnsProviderProps {
  children: ReactNode;
}

export const SelectedColumnsProvider = ({
  children,
}: SelectedColumnsProviderProps) => {
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnKey[]>(REQUIRED_KEYS);

  const toggleColumn = (key: ColumnKey, required: boolean) => {
    if (required) return;

    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };

  return (
    <SelectedColumnsContext.Provider value={{ selectedColumns, toggleColumn }}>
      {children}
    </SelectedColumnsContext.Provider>
  );
};
