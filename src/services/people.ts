import { FullPerson, PersonPreview } from '@/types/person';
import type {
  DefaultPeopleResponse,
  PersonDetailsResponse,
  SearchPeopleResponse,
} from '@/types/api';

import {
  BASE_URL,
  DEFAULT_PAGE_LIMIT_PARAM,
  DEFAULT_PAGE_NUMBER_PARAM,
} from '@/constants/common';

export async function fetchAllPeople(
  page: number = DEFAULT_PAGE_NUMBER_PARAM,
  limit: number = DEFAULT_PAGE_LIMIT_PARAM
): Promise<{ people: PersonPreview[]; totalPages: number }> {
  const url = `${BASE_URL}?page=${page}&limit=${limit}`;
  const response = await fetch(url, {
    next: { revalidate: 60, tags: ['people', `people:${page}`] },
  });

  if (!response.ok) {
    throw new Error(`Api error ${response.status}: ${response.statusText}`);
  }

  const data: DefaultPeopleResponse = await response.json();

  return { people: data.results, totalPages: data.total_pages || 1 };
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
