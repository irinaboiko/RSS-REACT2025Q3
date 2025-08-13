import type { FullPerson, PersonPreview } from '@/types/person';

export interface DefaultPeopleResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: PersonPreview[];
}

export interface SearchPeopleResponse {
  message: string;
  result: FullPerson[];
}

export type PeopleResponse = DefaultPeopleResponse;

export interface PersonDetailsResponse {
  message: string;
  result: FullPerson;
}
