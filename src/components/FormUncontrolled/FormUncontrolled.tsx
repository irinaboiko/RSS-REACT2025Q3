import { useState } from 'react';
import type { FormEvent } from 'react';
import { ValidationError } from 'yup';
import { clsx } from 'clsx';

import { PasswordStrength } from '@/components/PasswordStrength';
import { useAppDispatch, useAppSelector } from '@/hooks';
import type { FormValues } from '@/types/forms';
import type { Gender, UserRecord } from '@/types/users';
import type { Country } from '@/types/countries';
import { addUser, clearRecentlyAdded } from '@/store/usersSlice';
import { mapFormToUser } from '@/utils';
import { buildFormSchema } from '@/validation/formSchema';

export interface FormUncontrolledProps {
  closeModal: () => void;
}

export const FormUncontrolled = ({ closeModal }: FormUncontrolledProps) => {
  const dispatch = useAppDispatch();
  const countries: Country[] = useAppSelector(
    (state) => state.countries.countries
  );

  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    const ageRaw = String(formData.get('age') ?? '');
    const age: number | undefined = ageRaw === '' ? undefined : Number(ageRaw);

    const pictureInput = form.elements.namedItem(
      'picture'
    ) as HTMLInputElement | null;
    const pictureFiles: FileList | null = pictureInput?.files ?? null;

    const values: FormValues = {
      name: formData.get('name') as string,
      age: age as number,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as Gender,
      acceptTnC: formData.get('acceptTnC') === 'on',
      picture: pictureFiles,
      country: formData.get('country') as string,
    };

    try {
      await buildFormSchema(countries).validate(values, { abortEarly: false });

      const newUser = await mapFormToUser(values);

      const newUserRecord: UserRecord = {
        ...newUser,
        source: 'uncontrolled',
      };

      dispatch(addUser(newUserRecord));
      setTimeout(() => dispatch(clearRecentlyAdded()), 4000);

      form.reset();
      closeModal();
    } catch (err) {
      if (err instanceof ValidationError) {
        const next: Partial<Record<keyof FormValues, string>> = {};
        if (err?.inner?.length) {
          for (const issue of err.inner) {
            const path = issue.path as keyof FormValues;
            if (path && !next[path]) next[path] = issue.message;
          }
        } else if (err?.path) {
          next[err.path as keyof FormValues] = err.message;
        }
        setErrors(next);
      }
    }
  }

  return (
    <form className="py-2" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name" className="cursor-pointer">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          aria-invalid={Boolean(errors.name)}
          className={clsx('form-input', errors.name && 'border-red-600')}
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="text-error">{errors.name}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="age" className="cursor-pointer">
          Age *
        </label>
        <input
          type="number"
          id="age"
          name="age"
          aria-invalid={Boolean(errors.age)}
          className={clsx('form-input', errors.age && 'border-red-600')}
          placeholder="Enter Your Age"
        />
        {errors.age && <p className="text-error">{errors.age}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="email" className="cursor-pointer">
          Email *
        </label>
        <input
          type="text"
          id="email"
          name="email"
          aria-invalid={Boolean(errors.email)}
          className={clsx('form-input', errors.email && 'border-red-600')}
          placeholder="Enter Your Email Address"
        />
        {errors.email && <p className="text-error">{errors.email}</p>}
      </div>

      <div className="mt-1 mb-2 flex h-24 flex-col">
        <label htmlFor="password" className="cursor-pointer">
          Password *
        </label>
        <input
          type="password"
          autoComplete="off"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={Boolean(errors.password)}
          className={clsx('form-input', errors.password && 'border-red-600')}
          placeholder="Enter Your Password"
        />
        <PasswordStrength password={password} />
        {errors.password && <p className="text-error">{errors.password}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="confirmPassword" className="cursor-pointer">
          Confirm Password *
        </label>
        <input
          type="password"
          autoComplete="off"
          id="confirmPassword"
          name="confirmPassword"
          aria-invalid={Boolean(errors.confirmPassword)}
          className={clsx(
            'form-input',
            errors.confirmPassword && 'border-red-600'
          )}
          placeholder="Confirm Your Password"
        />
        {errors.confirmPassword && (
          <p className="text-error">{errors.confirmPassword}</p>
        )}
      </div>

      <fieldset className="mt-1 mb-2 flex h-14 flex-col">
        <legend>Gender *</legend>
        <div className="flex gap-4">
          <div>
            <input
              id="gender-m"
              name="gender"
              type="radio"
              value="male"
              className="mr-1 cursor-pointer"
            />
            <label htmlFor="gender-m" className="cursor-pointer">
              Male
            </label>
          </div>
          <div>
            <input
              id="gender-f"
              name="gender"
              type="radio"
              value="female"
              className="mr-1 cursor-pointer"
            />
            <label htmlFor="gender-f" className="cursor-pointer">
              Female
            </label>
          </div>
        </div>

        {errors.gender && <p className="text-error">{errors.gender}</p>}
      </fieldset>

      <div className="mt-2 mb-6 h-20">
        <label htmlFor="picture" className="cursor-pointer">
          Profile picture (PNG/JPEG, up to 2MB)
        </label>
        <input
          id="picture"
          name="picture"
          type="file"
          accept="image/png,image/jpeg"
          aria-invalid={Boolean(errors.picture)}
          className={clsx(
            'w-full cursor-pointer rounded-lg border-2 p-2 file:mr-2 file:rounded-lg file:border-2 file:p-2',
            errors.picture && 'border-red-600'
          )}
        />
        {errors.picture && <p className="text-error">{errors.picture}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="country" className="cursor-pointer">
          Country *
        </label>
        <input
          id="country"
          name="country"
          list="country-list"
          autoComplete="on"
          className={clsx('form-input', errors.country && 'border-red-600')}
          placeholder="Start typing a country..."
        />
        <datalist id="country-list">
          {countries.map((c: Country) => (
            <option key={c.code} value={c.name} />
          ))}
        </datalist>
        {errors.country && <p className="text-error">{errors.country}</p>}
      </div>

      <div className="mt-1 mb-2 flex h-12 flex-col">
        <div className="flex items-center">
          <input
            id="acceptTnC"
            name="acceptTnC"
            type="checkbox"
            className="mr-1 h-4 w-4 cursor-pointer"
          />
          <label htmlFor="acceptTnC" className="cursor-pointer">
            I accept the Terms and Conditions *
          </label>
        </div>
        {errors.acceptTnC && <p className="text-error">{errors.acceptTnC}</p>}
      </div>

      <div className="my-2 flex justify-center">
        <button
          type="submit"
          className="cursor-pointer rounded-lg border-2 p-2 hover:border-amber-400"
        >
          Add User
        </button>
      </div>
    </form>
  );
};
