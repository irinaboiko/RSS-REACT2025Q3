import type { CO2Data } from '@/types/table';

import { DataTableHeader } from '@/components/DataTableHeader';
import { DataTableRow } from '@/components/DataTableRow';

export interface DataTableProps {
  countries: CO2Data;
}

export const DataTable = ({ countries }: DataTableProps) => {
  const countriesNames = Object.keys(countries);

  return (
    <div className="bottom-10 border-1 border-gray-200 text-sm">
      <DataTableHeader />

      {countriesNames.map((countryName) => (
        <DataTableRow
          key={countryName}
          countryName={countryName}
          countryData={countries[countryName]}
        />
      ))}
    </div>
  );
};
