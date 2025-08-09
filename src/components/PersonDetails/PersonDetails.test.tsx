import { Provider } from 'react-redux';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { PersonDetails } from '@/components/PersonDetails/PersonDetails';
import { ROUTES } from '@/constants/routes';

import { TEST_IDS } from '@/__tests__/testConstants';
import { lukeSkywalkerDetails } from '@/__tests__/mocks/peopleMocks';
import { createTestStore } from '@/__tests__/utils/createTestStore';

const { LOADER } = TEST_IDS;

const refetchSpy = vi.fn();
const useGetPersonByIdQueryMock = vi.fn();

vi.mock('@/services', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/services')>();
  return {
    ...actual,
    useGetPersonByIdQuery: (arg: string) => useGetPersonByIdQueryMock(arg),
  };
});

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (route: string = '/details/1') =>
  render(
    <Provider store={createTestStore()}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/details/:detailsId" element={<PersonDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

describe('Person Details', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loader', () => {
    useGetPersonByIdQueryMock.mockReturnValue({
      data: lukeSkywalkerDetails,
      isFetching: true,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: refetchSpy,
    });

    renderWithRouter();

    const loader = screen.getByTestId(LOADER);
    expect(loader).toBeInTheDocument();
  });

  it('renders success content', () => {
    useGetPersonByIdQueryMock.mockReturnValue({
      data: lukeSkywalkerDetails,
      isFetching: false,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: refetchSpy,
    });

    renderWithRouter();

    expect(
      screen.getByRole('heading', { level: 2, name: /luke skywalker/i })
    ).toBeInTheDocument();
  });

  it('calls refetch on Refresh click', () => {
    useGetPersonByIdQueryMock.mockReturnValue({
      data: lukeSkywalkerDetails,
      isFetching: false,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: refetchSpy,
    });

    renderWithRouter();

    const refreshBtn = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshBtn);
    expect(refetchSpy).toHaveBeenCalledTimes(1);
  });

  it('navigates to HOME on Close click', () => {
    useGetPersonByIdQueryMock.mockReturnValue({
      data: lukeSkywalkerDetails,
      isFetching: false,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: refetchSpy,
    });

    renderWithRouter();

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    expect(mockNavigate).toHaveBeenCalledWith(`${ROUTES.HOME}`);
  });

  it('renders error UI when an error occurred', () => {
    useGetPersonByIdQueryMock.mockReturnValue({
      data: undefined,
      isFetching: false,
      isLoading: false,
      isError: true,
      error: { status: 400, data: { message: 'Bad Request' } },
      refetch: refetchSpy,
    });

    renderWithRouter('/details/invalid');

    expect(screen.getByText(/oops! an error occurred/i)).toBeInTheDocument();
  });
});
