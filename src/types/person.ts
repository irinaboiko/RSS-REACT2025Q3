export interface PersonPreview {
  uid: string;
  name: string;
  url: string;
}

export interface PersonProperties {
  created: string;
  edited: string;
  name: string;
  gender: 'male' | 'female' | 'unknown' | 'n/a';
  skin_color: string;
  hair_color: string;
  height: string;
  eye_color: string;
  mass: string;
  homeworld: string;
  birth_year: string;
  url: string;
  films?: string[];
  species?: string[];
  starships?: string[];
  vehicles?: string[];
}

export interface FullPerson {
  uid: string;
  description: string;
  _id: string;
  __v: number;
  properties: PersonProperties;
}
