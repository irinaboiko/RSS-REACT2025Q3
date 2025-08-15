import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Api error ${response.status}: ${response.statusText}`);
  }

  const data: DefaultPeopleResponse = await response.json();

  return { people: data.results, totalPages: data.total_pages || 1 };
}

export const peopleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAllPeople: build.query<
      { data: PersonPreview[]; totalPages: number },
      { page: number; limit: number }
    >({
      query: ({
        page = DEFAULT_PAGE_NUMBER_PARAM,
        limit = DEFAULT_PAGE_LIMIT_PARAM,
      }) => `${BASE_URL}?page=${page}&limit=${limit}`,
      transformResponse: (response: DefaultPeopleResponse) => ({
        data: response.results,
        totalPages: response.total_pages || 1,
      }),
    }),

    getSearchedPeople: build.query<PersonPreview[], string>({
      query: (search: string) => `${BASE_URL}?name=${search}`,
      transformResponse: (response: SearchPeopleResponse): PersonPreview[] => {
        return response?.result?.map((person) => ({
          uid: person.uid,
          name: person.properties.name,
          url: person.properties.url,
        }));
      },
    }),

    getPersonById: build.query<FullPerson, string>({
      query: (personId: string) => `${BASE_URL}/${personId}`,
      transformResponse: (response: PersonDetailsResponse) => response.result,
    }),
  }),
});

export const {
  useGetAllPeopleQuery,
  useGetSearchedPeopleQuery,
  useGetPersonByIdQuery,
} = peopleApi;
