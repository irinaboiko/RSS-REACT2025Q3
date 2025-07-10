import type {
  FullPerson,
  PeopleResponse,
  PersonPreview,
} from '../types/person.ts';

const BASE_URL = 'https://swapi.tech/api';

export async function fetchPeople(search: string): Promise<PersonPreview[]> {
  const url = `${BASE_URL}/people/${search ? `?name=${encodeURIComponent(search)}` : ''}`;
  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: PeopleResponse = await response.json();

  if ('results' in data) {
    return data.results;
  } else if ('result' in data) {
    return data.result.map((person: FullPerson) => ({
      uid: person.uid,
      name: person.properties.name,
      url: person.properties.url,
    }));
  }

  return [];
}
