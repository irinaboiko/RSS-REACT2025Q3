import type { Person } from '../types/person.ts';

const BASE_URL = 'https://swapi.tech/api';

interface FetchPeopleResponse {
  results: Person[];
}

export async function fetchPeople(search: string): Promise<Person[]> {
  const url = `${BASE_URL}/people/?search=${encodeURIComponent(search)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: FetchPeopleResponse = await response.json();
  return data.results;
}
