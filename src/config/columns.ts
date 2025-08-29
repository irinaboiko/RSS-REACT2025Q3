export type ColumnKey =
  | 'name'
  | 'iso_code'
  | 'year'
  | 'population'
  | 'co2'
  | 'co2_per_capita'
  | 'methane'
  | 'oil_co2'
  | 'gas_co2'
  | 'temperature_change_from_co2';

export type ColumnConfig = {
  key: ColumnKey;
  label: string;
  required: boolean;
};

export const COLUMNS: ColumnConfig[] = [
  { key: 'name', label: 'Name', required: true },
  { key: 'iso_code', label: 'ISO code', required: true },
  { key: 'year', label: 'Year', required: true },
  { key: 'population', label: 'Population', required: true },
  { key: 'co2', label: 'CO₂', required: true },
  { key: 'co2_per_capita', label: 'CO₂ per Capita', required: true },

  { key: 'methane', label: 'Methane', required: false },
  { key: 'oil_co2', label: 'Oil CO₂', required: false },
  { key: 'gas_co2', label: 'Gas CO₂', required: false },
  {
    key: 'temperature_change_from_co2',
    label: 'Temperature change from CO₂',
    required: false,
  },
];

export const REQUIRED_KEYS = COLUMNS.filter((column) => column.required).map(
  (column) => column.key
);
