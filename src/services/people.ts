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
