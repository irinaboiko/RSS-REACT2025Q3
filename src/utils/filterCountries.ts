export const filterCountries = (
  countries: string[],
  filterValue: string
): string[] => {
  if (!filterValue) return countries;

  return countries.filter((country) =>
    country.toLowerCase().includes(filterValue.toLowerCase().trim())
  );
};
