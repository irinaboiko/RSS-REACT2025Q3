export interface CountriesListHeaderProps {
  year?: string;
}

export const CountriesListHeader = ({
  year = 'latest',
}: CountriesListHeaderProps) => {
  return (
    <div className="grid grid-cols-3 border-b-1 border-gray-200 bg-gray-50 px-2 py-1 text-sm">
      <div>Country Name</div>
      <div>Population ({year})</div>
      <div>ISO code</div>
    </div>
  );
};
