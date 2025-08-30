import type { CO2Data } from '@/types/table';
import { DataTableHeader } from '@/components/DataTableHeader';
import { DataTableRow } from '@/components/DataTableRow';
import { useColumnsSort } from '@/hooks/useColumnsSort';
import { sortColumn } from '@/utils/sortColumn';
import { useSearchBar } from '@/hooks/useSearchBar';
import { filterCountries } from '@/utils/filterCountries';

export interface DataTableProps {
  countries: CO2Data;
}

export const DataTable = ({ countries }: DataTableProps) => {
  const { searchValue } = useSearchBar();
  const { direction } = useColumnsSort();

  const countriesNames: string[] = Object.keys(countries);
  const filteredCountriesNames: string[] = filterCountries(
    countriesNames,
    searchValue
  );

  if (filteredCountriesNames.length === 0)
    return <p>No countries match your search.</p>;

  const sortedCountriesNames: string[] = sortColumn(
    filteredCountriesNames,
    direction
  );

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
