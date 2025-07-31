import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { downloadCsv } from '@/utils/downloadCsv';
import type { PersonPreview } from '@/types/person';
import { c3po, lukeSkywalker } from '@/__tests__/mocks/peopleMocks';

const mockPeople: PersonPreview[] = [lukeSkywalker, c3po];

describe('downloadCsv', () => {
  const originalCreateObjectURL = URL.createObjectURL;

  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:url');
    vi.spyOn(document, 'createElement').mockImplementation(() => {
      return {
        setAttribute: vi.fn(),
        click: vi.fn(),
        style: { display: '' },
      } as unknown as HTMLAnchorElement;
    });
    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    URL.createObjectURL = originalCreateObjectURL;
  });

  it('does nothing if list is empty', () => {
    downloadCsv([]);

    expect(document.createElement).not.toHaveBeenCalled();
    expect(document.body.appendChild).not.toHaveBeenCalled();
  });

  it('sets singular file name when only one person is selected', () => {
    const setAttribute = vi.fn();
    vi.spyOn(document, 'createElement').mockReturnValue({
      setAttribute,
      click: vi.fn(),
      style: { display: '' },
    } as unknown as HTMLAnchorElement);

    const singlePerson: PersonPreview[] = [lukeSkywalker];

    downloadCsv(singlePerson);

    expect(setAttribute).toHaveBeenCalledWith(
      'download',
      'STAR_WARS_PEOPLE_1_item.csv'
    );
  });

  it('sets correct download file name', () => {
    const setAttribute = vi.fn();
    vi.spyOn(document, 'createElement').mockReturnValue({
      setAttribute,
      click: vi.fn(),
      style: { display: '' },
    } as unknown as HTMLAnchorElement);

    downloadCsv(mockPeople);

    expect(setAttribute).toHaveBeenCalledWith(
      'download',
      'STAR_WARS_PEOPLE_2_items.csv'
    );
  });
});
