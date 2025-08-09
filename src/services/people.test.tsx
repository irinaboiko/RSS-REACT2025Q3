import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import {
  useGetAllPeopleQuery,
  useGetPersonByIdQuery,
  useGetSearchedPeopleQuery,
} from '@/services/people';
import {
  lukeSkywalker,
  lukeSkywalkerDetails,
  mockPeopleArray,
} from '@/__tests__/mocks/peopleMocks';
import { createTestStore } from '@/__tests__/utils/createTestStore';
import { MESSAGES } from '@/__tests__/testConstants';
import { BASE_URL } from '@/constants/common';

const wrapper = (props: { children: ReactNode }) => {
  return <Provider store={createTestStore()}>{props.children}</Provider>;
};

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('people API', () => {
  it('renders useGetAllPeopleQuery hook successfully', async () => {
    const endpointName = 'getAllPeople';
    const page = 1;
    const limit = 10;

    fetchMock.mockOnceIf(`${BASE_URL}?page=${page}&limit=${limit}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({
          results: mockPeopleArray,
        }),
      })
    );

    const { result } = renderHook(() => useGetAllPeopleQuery({ page, limit }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName,
      data: {
        data: mockPeopleArray,
        totalPages: 1,
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
  });

  it('handles useGetAllPeopleQuery API error response', async () => {
    const endpointName = 'getAllPeople';
    const page = 1;
    const limit = 10;

    fetchMock.mockOnceIf(`${BASE_URL}?page=${page}&limit=${limit}`, () =>
      Promise.resolve({
        status: 400,
        body: JSON.stringify({ message: MESSAGES.apiBadRequest }),
      })
    );

    const { result } = renderHook(() => useGetAllPeopleQuery({ page, limit }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current).toMatchObject({
      status: 'rejected',
      endpointName,
      error: {
        status: 400,
      },
      isLoading: false,
      isSuccess: false,
      isError: true,
      isFetching: false,
    });
  });

  it('renders useGetSearchedPeopleQuery hook successfully', async () => {
    const endpointName = 'getSearchedPeople';
    const search = 'luke';

    fetchMock.mockOnceIf(`${BASE_URL}?name=${search}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ result: [lukeSkywalkerDetails] }),
      })
    );

    const { result } = renderHook(() => useGetSearchedPeopleQuery(search), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName,
      data: [lukeSkywalker],
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
  });

  it('handles useGetSearchedPeopleQuery API error response', async () => {
    const endpointName = 'getSearchedPeople';
    const search = 'invalid';

    fetchMock.mockOnceIf(`${BASE_URL}?name=${search}`, () =>
      Promise.resolve({
        status: 404,
        body: JSON.stringify({ message: 'Not Found' }),
      })
    );

    const { result } = renderHook(() => useGetSearchedPeopleQuery(search), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current).toMatchObject({
      status: 'rejected',
      endpointName,
      error: { status: 404 },
      isLoading: false,
      isSuccess: false,
      isError: true,
      isFetching: false,
    });
  });

  it('renders useGetPersonByIdQuery hook successfully', async () => {
    const endpointName = 'getPersonById';
    const personId = '1';

    fetchMock.mockOnceIf(`${BASE_URL}/${personId}`, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ result: lukeSkywalkerDetails }),
      })
    );

    const { result } = renderHook(() => useGetPersonByIdQuery(personId), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName,
      data: lukeSkywalkerDetails,
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
  });

  it('handles useGetPersonByIdQuery API error response', async () => {
    const endpointName = 'getPersonById';
    const personId = 'invalid';

    fetchMock.mockOnceIf(`${BASE_URL}/${personId}`, () =>
      Promise.resolve({
        status: 404,
        body: JSON.stringify({ message: 'Not Found' }),
      })
    );

    const { result } = renderHook(() => useGetPersonByIdQuery(personId), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current).toMatchObject({
      status: 'rejected',
      endpointName,
      error: { status: 404 },
      isLoading: false,
      isSuccess: false,
      isError: true,
      isFetching: false,
    });
  });
});
