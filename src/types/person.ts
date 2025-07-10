export interface PersonPreview {
  uid: string;
  name: string;
  url: string;
}

export interface Person {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: 'Male' | 'Female' | 'unknown' | 'n/a';
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}

export interface FullPerson {
  uid: string;
  url: string;
  description: string;
  _id: string;
  __v: number;
  properties: Person;
}

interface DefaultPeopleResponse {
  message: string;
  total_records: number;
  total_pages: number;
  results: PersonPreview[];
}

interface SearchPeopleResponse {
  message: string;
  result: FullPerson[];
}

export type PeopleResponse = DefaultPeopleResponse | SearchPeopleResponse;
