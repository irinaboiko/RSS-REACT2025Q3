export type YearRow = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
};

export type CountryData = {
  iso_code?: string;
  data: YearRow[];
};

export type CO2Data = Record<string, CountryData>;
