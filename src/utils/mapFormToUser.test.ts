import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  afterEach,
} from 'vitest';
import { fileToBase64 } from '@/utils/fileToBase64';
import type { FormValues } from '@/types/forms';

import { mapFormToUser } from './mapFormToUser';

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'uuid-mock-123'),
}));

vi.mock('@/utils/fileToBase64', () => ({
  fileToBase64: vi.fn(async () => 'data:base64,mocked'),
}));

function createFileList(
  size: number,
  name = 'pic.png',
  type = 'image/png'
): FileList {
  const content = size > 0 ? 'x'.repeat(size) : '';
  const file = new File([content], name, { type });
  const list = {
    0: file,
    length: 1,
    item: (i: number) => (i === 0 ? file : null),
  } as unknown as FileList;
  return list;
}

const FIXED_ISO = '2025-08-24T10:00:00.000Z';

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(FIXED_ISO));
});

afterAll(() => {
  vi.useRealTimers();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('mapFormToUser', () => {
  it('maps fields and encodes picture when valid file present', async () => {
    const values: FormValues = {
      name: 'Alice',
      age: 30,
      email: 'a@example.com',
      password: 'Aa1!',
      confirmPassword: 'Aa1!',
      gender: 'female',
      acceptTnC: true,
      picture: createFileList(10),
      country: 'Poland',
    };

    const user = await mapFormToUser(values);

    expect(user).toMatchObject({
      id: 'uuid-mock-123',
      name: 'Alice',
      age: 30,
      email: 'a@example.com',
      password: 'Aa1!',
      gender: 'female',
      acceptTnC: true,
      country: 'Poland',
      pictureUrl: 'data:base64,mocked',
      createdAt: FIXED_ISO,
    });
  });

  it('sets empty pictureUrl when picture is null', async () => {
    const values: FormValues = {
      name: 'Bob',
      age: 22,
      email: 'b@example.com',
      password: 'Ab1!',
      confirmPassword: 'Ab1!',
      gender: 'male',
      acceptTnC: false,
      picture: null,
      country: 'Germany',
    };

    const user = await mapFormToUser(values);

    expect(user.pictureUrl).toBe('');
  });

  it('does not encode when file size is 0', async () => {
    const values: FormValues = {
      name: 'Carol',
      age: 28,
      email: 'c@example.com',
      password: 'Aa1!',
      confirmPassword: 'Aa1!',
      gender: 'female',
      acceptTnC: true,
      picture: createFileList(0),
      country: 'France',
    };

    const user = await mapFormToUser(values);

    expect(user.pictureUrl).toBe('');
    expect(fileToBase64).not.toHaveBeenCalled();
  });
});
