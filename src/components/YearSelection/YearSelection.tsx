import type { ChangeEvent } from 'react';

import { MAX_YEAR, MIN_YEAR } from '@/config/constants';
import { useYearSelection } from '@/hooks/useYearSelection';

export const YearSelection = () => {
  const { currentYear, setCurrentYear } = useYearSelection();

  const years: number[] = Array.from(
    { length: MAX_YEAR - MIN_YEAR + 1 },
    (_, i) => MAX_YEAR - i
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(Number(event.target.value));
  };

  return (
    <select value={currentYear} onChange={handleChange}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};
