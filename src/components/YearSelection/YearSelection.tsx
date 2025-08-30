import type { ChangeEvent } from 'react';

import { YEARS } from '@/config/constants';
import { useYearSelection } from '@/hooks/useYearSelection';

export const YearSelection = () => {
  const { currentYear, setCurrentYear } = useYearSelection();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(Number(event.target.value));
  };

  return (
    <select value={currentYear} onChange={handleChange}>
      {YEARS.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};
