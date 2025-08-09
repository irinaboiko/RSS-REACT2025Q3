import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';

import { Home } from '@/pages/Home';

import { TEST_IDS } from '@/__tests__/testConstants';
import { createTestStore } from '@/__tests__/utils/createTestStore';
import type { UsePaginationMetaProps, UsePeopleQueryMetaParams } from '@/hooks';
import { mockPeopleArray } from '@/__tests__/mocks/peopleMocks';
import { RESULTS_PER_PAGE } from '@/constants/common';

const { SEARCH_FORM } = TEST_IDS;

const useGetAllPeopleQueryMock = vi.fn();
const useGetSearchedPeopleQueryMock = vi.fn();

vi.mock('@/services', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/services')>();
  return {
    ...actual,
    useGetAllPeopleQuery: (args: { page: number; limit: number }) =>
      useGetAllPeopleQueryMock(args),
    useGetSearchedPeopleQuery: (arg: string) =>
      useGetSearchedPeopleQueryMock(arg),
  };
});

const useLocalStorageMock = vi.fn();
const usePaginationMetaMock = vi.fn();
const usePeopleQueryMetaMock = vi.fn();
vi.mock('@/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/hooks')>();
  return {
    ...actual,
    useLocalStorage: (key: string) => useLocalStorageMock(key),
    usePaginationMeta: (args: UsePaginationMetaProps) =>
      usePaginationMetaMock(args),
    usePeopleQueryMeta: (args: UsePeopleQueryMetaParams) =>
      usePeopleQueryMetaMock(args),
  };
});

const renderWithRouter = (route: string = '/home?page=1') =>
  render(
    <Provider store={createTestStore()}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

describe('Home page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useLocalStorageMock.mockReturnValue(['', vi.fn()]);

    usePeopleQueryMetaMock.mockReturnValue({
      isLoading: false,
      error: undefined,
    });

    usePaginationMetaMock.mockReturnValue({
      people: [],
      totalPages: 1,
    });

    useGetAllPeopleQueryMock.mockReturnValue({
      data: { data: [], totalPages: 1 },
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });

    useGetSearchedPeopleQueryMock.mockReturnValue({
      data: [],
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });
  });

  it('renders SearchBar', async () => {
    renderWithRouter();
    expect(screen.getByTestId(SEARCH_FORM)).toBeInTheDocument();
  });

  it('renders error message on getAllPeople error', async () => {
    useGetAllPeopleQueryMock.mockReturnValueOnce({
      data: undefined,
      isFetching: false,
      error: { status: 400, data: { message: 'Bad Request' } },
      refetch: vi.fn(),
    });

    usePeopleQueryMetaMock.mockReturnValueOnce({
      isLoading: false,
      error: { status: 400, data: { message: 'Bad Request' } },
    });

    renderWithRouter();

    expect(screen.getByText(/oops! an error occurred/i)).toBeInTheDocument();
  });

  it('renders correct totalPages and currentPage', async () => {
    usePaginationMetaMock.mockReturnValueOnce({
      people: mockPeopleArray,
      totalPages: 10,
    });

    renderWithRouter();

    expect(screen.getByText('1')).toHaveClass('link-active');
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('updates page on Pagination click', async () => {
    usePaginationMetaMock.mockReturnValueOnce({
      people: mockPeopleArray,
      totalPages: 10,
    });

    renderWithRouter();

    const page3 = await screen.findByRole('button', { name: '3' });
    fireEvent.click(page3);

    const calls = useGetAllPeopleQueryMock.mock.calls;
    expect(calls.at(-1)).toEqual([{ page: 3, limit: RESULTS_PER_PAGE }]);
  });

  it('calls allPeopleRefetch when not searching', () => {
    const allPeopleRefetchSpy = vi.fn();

    useLocalStorageMock.mockReturnValueOnce(['', vi.fn()]);
    useGetAllPeopleQueryMock.mockReturnValueOnce({
      data: { data: [], totalPages: 1 },
      isFetching: false,
      error: undefined,
      refetch: allPeopleRefetchSpy,
    });

    renderWithRouter();

    fireEvent.click(screen.getByRole('button', { name: /refresh/i }));

    expect(allPeopleRefetchSpy).toHaveBeenCalled();
  });

  it('calls searchingRefetch when searching', () => {
    const searchingRefetchSpy = vi.fn();

    useLocalStorageMock.mockReturnValueOnce(['luke', vi.fn()]);
    useGetSearchedPeopleQueryMock.mockReturnValueOnce({
      data: [],
      isFetching: false,
      error: undefined,
      refetch: searchingRefetchSpy,
    });

    renderWithRouter();

    fireEvent.click(screen.getByRole('button', { name: /refresh/i }));

    expect(searchingRefetchSpy).toHaveBeenCalled();
  });
});
