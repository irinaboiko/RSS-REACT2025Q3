import type { CO2Data } from '@/types/table';

const DATA_URL =
  'https://raw.githubusercontent.com/irinaboiko/co2data/refs/heads/main/owid-co2-data.json';

let dataPromise: Promise<CO2Data> | null = null;

export function getData(): Promise<CO2Data> {
  if (!dataPromise) {
    dataPromise = fetch(DATA_URL).then((res) => {
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      return res.json();
    });
  }
  return dataPromise;
}
