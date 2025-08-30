import { useMemo } from 'react';

import { DataTableHeader } from '@/components/DataTableHeader';
import { DataTableRow } from '@/components/DataTableRow';

import { useColumnsSort } from '@/hooks/useColumnsSort';
import { sortColumn } from '@/utils/sortColumn';
import { useSearchBar } from '@/hooks/useSearchBar';
import { filterCountries } from '@/utils/filterCountries';
import type { CO2Data } from '@/types/table';

export interface DataTableProps {
  countries: CO2Data;
}

export const DataTable = ({ countries }: DataTableProps) => {
  const { debouncedValue } = useSearchBar();
  const { direction } = useColumnsSort();

  const countriesNames: string[] = useMemo(
    () => Object.keys(countries),
    [countries]
  );

  const filteredCountriesNames: string[] = useMemo(
    () => filterCountries(countriesNames, debouncedValue),
    [countriesNames, debouncedValue]
  );

  const sortedCountriesNames: string[] = useMemo(
    () => sortColumn(filteredCountriesNames, direction),
    [filteredCountriesNames, direction]
  );

  if (filteredCountriesNames.length === 0)
    return <p>No countries match your search.</p>;

  return (
    <div className="bottom-10 border-1 border-gray-200 text-sm">
      <DataTableHeader />

      {sortedCountriesNames.map((countryName) => (
        <DataTableRow
          key={countryName}
          countryName={countryName}
          countryData={countries[countryName]}
        />
      ))}
    </div>
  );
};
