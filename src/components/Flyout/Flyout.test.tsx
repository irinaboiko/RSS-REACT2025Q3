import { screen, fireEvent, render } from '@testing-library/react';
import { describe, it, afterEach, beforeEach, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { Flyout } from '@/components/Flyout/Flyout';
import { selectPerson } from '@/store/selectedPeopleSlice';
import type { PersonPreview } from '@/types/person';
import { generateCsvBlob } from '@/utils';

import { createTestStore } from '@/__tests__/utils/createTestStore';
import { lukeSkywalker, c3po } from '@/__tests__/mocks/peopleMocks';

vi.mock('@/utils', () => ({
  generateCsvBlob: vi.fn(),
}));

const mockedGenerateCsvBlob = vi.mocked(generateCsvBlob);

describe('Flyout', () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderWithStore = (selectedPeople: PersonPreview[] = []) => {
    const testStore = createTestStore();

    selectedPeople.forEach((person: PersonPreview) => {
      testStore.dispatch(selectPerson(person));
    });

    return {
      testStore,
      ...render(
        <Provider store={testStore}>
          <MemoryRouter>
            <Flyout />
          </MemoryRouter>
        </Provider>
      ),
    };
  };

  it('does not render if no people are selected', () => {
    renderWithStore();
    expect(screen.queryByText(/item is selected/i)).not.toBeInTheDocument();
  });

  it('renders with one selected person', () => {
    renderWithStore([lukeSkywalker]);
    expect(screen.getByText(/1 item is selected/i)).toBeInTheDocument();
  });

  it('renders with multiple selected people', () => {
    renderWithStore([lukeSkywalker, c3po]);
    expect(screen.getByText(/2 items are selected/i)).toBeInTheDocument();
  });

  it('clears selection on Unselect All click', () => {
    const { testStore } = renderWithStore([lukeSkywalker]);

    const unselectButton = screen.getByText(/unselect all/i);
    fireEvent.click(unselectButton);

    expect(testStore.getState().selectedPeople.people).toEqual([]);
  });

  it('calls downloadCsv on Download CSV click', () => {
    const mockBlob = new Blob(['csv test content'], { type: 'text/csv' });

    mockedGenerateCsvBlob.mockReturnValue({
      blob: mockBlob,
      fileName: 'mock.csv',
    });

    renderWithStore([lukeSkywalker, c3po]);

    const downloadButton = screen.getByText(/download csv/i);
    fireEvent.click(downloadButton);

    expect(mockedGenerateCsvBlob).toHaveBeenCalledWith([lukeSkywalker, c3po]);
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
  });
});
