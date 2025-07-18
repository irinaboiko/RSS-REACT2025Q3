export interface PersonPreview {
  uid: string;
  name: string;
  url: string;
}

export interface Person {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: 'male' | 'female' | 'unknown' | 'n/a';
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films?: string[];
  species?: string[];
  starships?: string[];
  vehicles?: string[];
  url: string;
  created: string;
  edited: string;
}

export interface FullPerson {
  uid: string;
  description: string;
  _id: string;
  __v: number;
  properties: Person;
}
