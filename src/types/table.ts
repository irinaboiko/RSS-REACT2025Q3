export type YearRow = {
  year: number;
  population: number | null;
  co2: number | null;
  co2_per_capita: number | null;
  [key: string]: number | null;
};

export type CountryData = {
  iso_code?: string;
  data: YearRow[];
};

export type CO2Data = Record<string, CountryData>;

export type SortDirection = 'asc' | 'desc';
