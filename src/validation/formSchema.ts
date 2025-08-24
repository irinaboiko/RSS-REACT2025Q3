import { boolean, mixed, number, object, ObjectSchema, ref, string } from 'yup';

import type { FormValues } from '@/types/forms';
import type { Country } from '@/types/countries';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

const firstFile = (list: FileList | null | undefined) =>
  list && list.length ? list.item(0) : null;

export function buildFormSchema(
  countries: Country[]
): ObjectSchema<FormValues> {
  const allowedCountries: string[] = countries.map((c) => c.name);

  return object({
    name: string()
      .required('Name is required')
      .matches(
        /^[A-Z][a-zA-Z\s]*$/,
        'Name must start with an uppercase letter'
      ),

    age: number()
      .typeError('Age must be a number')
      .required('Age is required')
      .min(0, 'Age cannot be negative'),

    email: string()
      .required('Email is required')
      .email('Invalid email address'),

    password: string()
      .required('Password is required')
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
        'Password must contain 1 number, 1 uppercase, 1 lowercase, and 1 special character'
      ),

    confirmPassword: string()
      .required('Confirm your password')
      .oneOf([ref('password')], 'Passwords must match'),

    gender: mixed<FormValues['gender']>()
      .oneOf(['male', 'female'], 'Select a gender')
      .required('Gender is required'),

    acceptTnC: boolean()
      .required('You must accept Terms & Conditions')
      .oneOf([true], 'You must accept Terms & Conditions')
      .default(false),

    picture: mixed<FileList>()
      .nullable()
      .transform((value) => {
        if (
          value &&
          typeof value === 'object' &&
          'length' in value &&
          value.length === 0
        ) {
          return null;
        }
        return value;
      })
      .test('fileSize', 'File is too large', (list) => {
        const file = firstFile(list as FileList | null);
        return !file || file.size <= MAX_FILE_SIZE;
      })
      .test('fileFormat', 'Unsupported file format', (list) => {
        const file = firstFile(list as FileList | null);
        return !file || SUPPORTED_FORMATS.includes(file.type);
      }),

    country: string()
      .required('Country is required')
      .oneOf(allowedCountries, 'Select a country from the list'),
  });
}
