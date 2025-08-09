import type { FullPerson, PersonPreview } from '@/types/person';

export const lukeSkywalker: PersonPreview = {
  uid: '1',
  name: 'Luke Skywalker',
  url: 'https://www.swapi.tech/api/people/1',
};

export const c3po: PersonPreview = {
  uid: '2',
  name: 'C-3PO',
  url: 'https://www.swapi.tech/api/people/2',
};

export const r2d2: PersonPreview = {
  uid: '3',
  name: 'R2-D2',
  url: 'https://www.swapi.tech/api/people/3',
};

export const darthVader: PersonPreview = {
  uid: '4',
  name: 'Darth Vader',
  url: 'https://www.swapi.tech/api/people/4',
};

export const leiaOrgana: PersonPreview = {
  uid: '5',
  name: 'Leia Organa',
  url: 'https://www.swapi.tech/api/people/5',
};

export const owenLars: PersonPreview = {
  uid: '6',
  name: 'Owen Lars',
  url: 'https://www.swapi.tech/api/people/6',
};

export const beruWhitesunLars: PersonPreview = {
  uid: '7',
  name: 'Beru Whitesun lars',
  url: 'https://www.swapi.tech/api/people/7',
};

export const r5d4: PersonPreview = {
  uid: '8',
  name: 'R5-D4',
  url: 'https://www.swapi.tech/api/people/8',
};

export const biggsDarklighter: PersonPreview = {
  uid: '9',
  name: 'Biggs Darklighter',
  url: 'https://www.swapi.tech/api/people/9',
};

export const obiWanKenobi: PersonPreview = {
  uid: '10',
  name: 'Obi-Wan Kenobi',
  url: 'https://www.swapi.tech/api/people/10',
};

export const lukeSkywalkerDetails: FullPerson = {
  properties: {
    created: '2025-07-23T16:37:44.996Z',
    edited: '2025-07-23T16:37:44.996Z',
    name: 'Luke Skywalker',
    gender: 'male',
    skin_color: 'fair',
    hair_color: 'blond',
    height: '172',
    eye_color: 'blue',
    mass: '77',
    homeworld: 'https://www.swapi.tech/api/planets/1',
    birth_year: '19BBY',
    url: 'https://www.swapi.tech/api/people/1',
  },
  _id: '5f63a36eee9fd7000499be42',
  description: 'A person within the Star Wars universe',
  uid: '1',
  __v: 2,
};

export const mockPeopleArray: PersonPreview[] = [
  lukeSkywalker,
  c3po,
  r2d2,
  darthVader,
  leiaOrgana,
  owenLars,
  beruWhitesunLars,
  r5d4,
  biggsDarklighter,
  obiWanKenobi,
];
