import { describe, it, expect } from 'vitest';

import { generateCsvBlob } from '@/utils';
import type { PersonPreview } from '@/types/person';
import { c3po, lukeSkywalker } from '@/__tests__/mocks/peopleMocks';

const mockPeople: PersonPreview[] = [lukeSkywalker, c3po];

describe('generateCsvBlob', () => {
  it('returns correct file name for single item', () => {
    const { fileName, blob } = generateCsvBlob([lukeSkywalker]);

    expect(fileName).toBe('STAR_WARS_PEOPLE_1_item.csv');
    expect(blob).toBeInstanceOf(Blob);
  });

  it('returns correct file name for multiple items', () => {
    const { fileName, blob } = generateCsvBlob(mockPeople);

    expect(fileName).toBe('STAR_WARS_PEOPLE_2_items.csv');
    expect(blob).toBeInstanceOf(Blob);
  });
});
