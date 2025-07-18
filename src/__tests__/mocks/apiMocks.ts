import type { PersonPreview } from '../../types/person.ts';
import type { PeopleResponse, SearchPeopleResponse } from '../../types/api.ts';

import {
  beruWhitesunLars,
  biggsDarklighter,
  c3po,
  darthVader,
  leiaOrgana,
  lukeSkywalker,
  obiWanKenobi,
  owenLars,
  r2d2,
  r5d4,
} from './peopleMocks.ts';

export const mockApiResponseWithoutSearchQuery: PeopleResponse = {
  message: 'ok',
  total_records: 82,
  total_pages: 9,
  previous: null,
  next: 'https://swapi.tech/api/people?page=2&limit=10',
  results: [
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
  ],
};

export const expectedPeopleWithoutSearchQuery: PersonPreview[] = [
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

export const mockApiResponseWithSearchQuery: SearchPeopleResponse = {
  message: 'ok',
  result: [
    {
      properties: {
        created: '2025-07-16T19:13:27.195Z',
        edited: '2025-07-16T19:13:27.195Z',
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
    },
  ],
};

export const expectedPeopleWithSearchQuery: PersonPreview[] = [lukeSkywalker];

export const mockApiResponseWithInvalidSearchQuery = {
  message: 'ok',
  result: [],
};
