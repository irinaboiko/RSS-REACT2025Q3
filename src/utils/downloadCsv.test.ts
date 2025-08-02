import { describe, it, expect, vi, afterEach } from 'vitest';
import { saveAs } from 'file-saver';

import { downloadCsv } from '@/utils/downloadCsv';
import type { PersonPreview } from '@/types/person';
import { c3po, lukeSkywalker } from '@/__tests__/mocks/peopleMocks';

const mockPeople: PersonPreview[] = [lukeSkywalker, c3po];

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

const mockedSaveAs = vi.mocked(saveAs);

describe('downloadCsv', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing if list is empty', () => {
    downloadCsv([]);

    expect(saveAs).not.toHaveBeenCalled();
  });

  it('sets singular file name when only one person is selected', () => {
    downloadCsv([lukeSkywalker]);

    expect(saveAs).toHaveBeenCalledTimes(1);
    const [, fileNameArg] = mockedSaveAs.mock.calls[0];
    expect(fileNameArg).toBe('STAR_WARS_PEOPLE_1_item.csv');
  });

  it('sets correct download file name', () => {
    downloadCsv(mockPeople);

    expect(saveAs).toHaveBeenCalledTimes(1);
    const [, fileNameArg] = mockedSaveAs.mock.calls[0];
    expect(fileNameArg).toBe('STAR_WARS_PEOPLE_2_items.csv');
  });
});
