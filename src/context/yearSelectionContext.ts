import { createContext } from 'react';

export interface YearSelectionContextType {
  currentYear: number;
  setCurrentYear: (value: number) => void;
}

export const YearSelectionContext =
  createContext<YearSelectionContextType | null>(null);
