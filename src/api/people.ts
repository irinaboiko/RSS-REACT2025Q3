import type { FullPerson, PersonPreview } from '@/types/person';
import type {
  DefaultPeopleResponse,
  PersonDetailsResponse,
  SearchPeopleResponse,
} from '@/types/api';

const BASE_URL = 'https://swapi.tech/api/people';

export async function fetchAllPeople(
  page: number = 1,
  limit: number = 10
): Promise<{ data: PersonPreview[]; totalPages: number }> {
  const url = `${BASE_URL}?page=${page}&limit=${limit}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Api error ${response.status}: ${response.statusText}`);
  }

  const data: DefaultPeopleResponse = await response.json();

  return { data: data.results, totalPages: data.total_pages || 1 };
}

export async function fetchSearchedPeople(
  search: string
): Promise<PersonPreview[]> {
  const url = `${BASE_URL}?name=${search}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Api error ${response.status}: ${response.statusText}`);
  }

  const data: SearchPeopleResponse = await response.json();

  return data?.result?.map((person: FullPerson) => ({
    uid: person.uid,
    name: person.properties.name,
    url: person.properties.url,
  }));
}

export async function fetchPersonDetails(
  personId: number
): Promise<FullPerson> {
  const url = `${BASE_URL}/${personId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Api error ${response.status}: ${response.statusText}`);
  }

  const data: PersonDetailsResponse = await response.json();

  return data.result;
}
