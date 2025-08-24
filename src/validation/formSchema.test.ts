import { describe, it, expect } from 'vitest';

import { buildFormSchema } from './formSchema';
import type { FormValues } from '@/types/forms';
import { COUNTRIES } from '@/constants';
import { ValidationError } from 'yup';

function fileOf(size: number, name = 'pic.png', type = 'image/png'): File {
  return new File([new Uint8Array(size)], name, { type });
}

export function fileListOf(...files: File[]): FileList {
  const list = {
    get length() {
      return files.length;
    },
    item(index: number): File | null {
      return files[index] ?? null;
    },
  } as unknown as FileList;

  files.forEach((file, i) => {
    Object.defineProperty(list, i, {
      value: file,
      enumerable: true,
      configurable: true,
    });
  });

  return list;
}

export function emptyFileList(): FileList {
  return fileListOf();
}

const schema = buildFormSchema(COUNTRIES);

export async function expectFieldError(
  values: Partial<FormValues>,
  field: keyof FormValues,
  message: string
): Promise<void> {
  try {
    await schema.validate(values as FormValues, { abortEarly: false });
  } catch (err: unknown) {
    if (!(err instanceof ValidationError)) {
      throw err;
    }

    const issue: ValidationError =
      err.inner?.find((e) => e.path === String(field)) ?? err;

    expect(issue.path).toBe(String(field));
    expect(issue.message).toBe(message);
  }
}

describe('buildFormSchema', () => {
  it('accepts a valid payload', async () => {
    const values: FormValues = {
      name: 'Alice',
      age: 30,
      email: 'alice@example.com',
      password: 'Aa1!',
      confirmPassword: 'Aa1!',
      gender: 'female',
      acceptTnC: true,
      picture: null,
      country: 'Poland',
    };

    await expect(
      schema.validate(values, { abortEarly: false })
    ).resolves.toMatchObject(values);
  });

  it('rejects name not starting with uppercase', async () => {
    await expectFieldError(
      {
        name: 'alice',
        age: 1,
        email: 'a@b.co',
        password: 'Aa1!',
        confirmPassword: 'Aa1!',
        gender: 'female',
        acceptTnC: true,
        picture: null,
        country: 'Poland',
      },
      'name',
      'Name must start with an uppercase letter'
    );
  });

  it('age must be non-negative', async () => {
    await expectFieldError(
      {
        name: 'Alice',
        age: -1,
        email: 'a@b.co',
        password: 'Aa1!',
        confirmPassword: 'Aa1!',
        gender: 'female',
        acceptTnC: true,
        picture: null,
        country: 'Poland',
      },
      'age',
      'Age cannot be negative'
    );
  });

  it('email must be valid', async () => {
    await expectFieldError(
      {
        name: 'Alice',
        age: 1,
        email: 'not-an-email',
        password: 'Aa1!',
        confirmPassword: 'Aa1!',
        gender: 'female',
        acceptTnC: true,
        picture: null,
        country: 'Poland',
      },
      'email',
      'Invalid email address'
    );
  });

  it('password must contain num/upper/lower/special', async () => {
    await expectFieldError(
      {
        name: 'Alice',
        age: 1,
        email: 'a@b.co',
        password: 'Aa1aaaa',
        confirmPassword: 'Aa1aaaa',
        gender: 'female',
        acceptTnC: true,
        picture: null,
        country: 'Poland',
      },
      'password',
      'Password must contain 1 number, 1 uppercase, 1 lowercase, and 1 special character'
    );
  });

  it('confirmPassword must match', async () => {
    await expectFieldError(
      {
        name: 'Alice',
        age: 1,
        email: 'a@b.co',
        password: 'Aa1!',
        confirmPassword: 'Aa1?',
        gender: 'female',
        acceptTnC: true,
        picture: null,
        country: 'Poland',
      },
      'confirmPassword',
      'Passwords must match'
    );
  });

  it('acceptTnC must be true', async () => {
    await expectFieldError(
      {
        name: 'Alice',
        age: 1,
        email: 'a@b.co',
        password: 'Aa1!',
        confirmPassword: 'Aa1!',
        gender: 'female',
        acceptTnC: false,
        picture: null,
        country: 'Poland',
      },
      'acceptTnC',
      'You must accept Terms & Conditions'
    );
  });

  it('empty picture FileList transforms to null', async () => {
    const values: FormValues = {
      name: 'Alice',
      age: 1,
      email: 'a@b.co',
      password: 'Aa1!',
      confirmPassword: 'Aa1!',
      gender: 'female',
      acceptTnC: true,
      picture: emptyFileList(),
      country: 'Poland',
    };
    const res = await schema.validate(values, { abortEarly: false });
    expect(res.picture).toBeNull();
  });

  it('picture: too large file is rejected', async () => {
    const tooBig = 2 * 1024 * 1024 + 1;
    await expectFieldError(
      {
        name: 'Alice',
        age: 1,
        email: 'a@b.co',
        password: 'Aa1!',
        confirmPassword: 'Aa1!',
        gender: 'female',
        acceptTnC: true,
        picture: fileListOf(fileOf(tooBig)),
        country: 'Poland',
      },
      'picture',
      'File is too large'
    );
  });

  it('country must be from provided list', async () => {
    await expectFieldError(
      {
        name: 'Alice',
        age: 1,
        email: 'a@b.co',
        password: 'Aa1!',
        confirmPassword: 'Aa1!',
        gender: 'female',
        acceptTnC: true,
        picture: null,
        country: 'Wakanda',
      },
      'country',
      'Select a country from the list'
    );
  });
});
