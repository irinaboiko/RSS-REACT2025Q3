import type { CO2Data } from '@/types/table';

import { CountriesListHeader } from '@/components/CountriesListHeader';
import { CountryListRow } from '@/components/CountryListRow';

export interface CountriesListProps {
  countries: CO2Data;
}

export const CountriesList = ({ countries }: CountriesListProps) => {
  const countriesNames = Object.keys(countries);

  return (
    <div className="relative rounded-lg border-1 border-gray-200">
      <CountriesListHeader />

      {countriesNames.map((countryName) => (
        <CountryListRow
          key={countryName}
          countryName={countryName}
          countryData={countries[countryName]}
        />
      ))}
    </div>
  );
};
