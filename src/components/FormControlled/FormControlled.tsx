import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clsx } from 'clsx';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { buildFormSchema } from '@/validation/formSchema';
import type { FormValues } from '@/types/forms';
import type { User, UserRecord } from '@/types/users';
import type { Country } from '@/types/countries';
import { PasswordStrength } from '@/components/PasswordStrength';
import { mapFormToUser } from '@/utils';
import { addUser, clearRecentlyAdded } from '@/store/usersSlice';

export interface FormControlledProps {
  closeModal: () => void;
}

export const FormControlled = ({ closeModal }: FormControlledProps) => {
  const dispatch = useAppDispatch();
  const countries: Country[] = useAppSelector(
    (state) => state.countries.countries
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(buildFormSchema(countries)),
    mode: 'onChange',
  });

  const password = watch('password') ?? '';

  const onSubmit = handleSubmit(async (data: FormValues) => {
    const newUser: User = await mapFormToUser(data);
    const newUserRecord: UserRecord = {
      ...newUser,
      source: 'controlled',
    };

    dispatch(addUser(newUserRecord));
    setTimeout(() => dispatch(clearRecentlyAdded()), 4000);

    closeModal();
  });

  return (
    <form className="py-2" onSubmit={onSubmit}>
      <div className="form-row">
        <label htmlFor="name" className="cursor-pointer">
          Name *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          name="name"
          aria-invalid={Boolean(errors.name)}
          className={clsx('form-input', errors.name && 'border-red-600')}
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="text-error">{errors?.name.message}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="age" className="cursor-pointer">
          Age *
        </label>
        <input
          {...register('age')}
          type="number"
          id="age"
          name="age"
          aria-invalid={Boolean(errors.age)}
          className={clsx('form-input', errors.age && 'border-red-600')}
          placeholder="Enter Your Age"
        />
        {errors.age && <p className="text-error">{errors?.age.message}</p>}
      </div>

      <div className="form-row">
        <label htmlFor="email" className="cursor-pointer">
          Email *
        </label>
        <input
          {...register('email')}
          type="text"
          id="email"
          name="email"
          aria-invalid={Boolean(errors.email)}
          className={clsx('form-input', errors.email && 'border-red-600')}
          placeholder="Enter Your Email Address"
        />
        {errors.email && <p className="text-error">{errors?.email.message}</p>}
      </div>

      <div className="mt-1 mb-2 flex h-24 flex-col">
        <label htmlFor="password" className="cursor-pointer">
          Password *
        </label>
        <input
          {...register('password')}
          type="password"
          autoComplete="off"
          id="password"
          name="password"
          aria-invalid={Boolean(errors.password)}
          className={clsx('form-input', errors.password && 'border-red-600')}
          placeholder="Enter Your Password"
        />
        <PasswordStrength password={password} />
        {errors.password && (
          <p className="text-error">{errors?.password.message}</p>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="confirmPassword" className="cursor-pointer">
          Confirm Password *
        </label>
        <input
          {...register('confirmPassword')}
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
          <p className="text-error">{errors?.confirmPassword.message}</p>
        )}
      </div>

      <fieldset className="mt-1 mb-2 flex h-14 flex-col">
        <legend>Gender *</legend>
        <div className="flex gap-4">
          <div>
            <input
              {...register('gender')}
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
              {...register('gender')}
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
        {errors.gender && (
          <p className="text-error">{errors?.gender.message}</p>
        )}
      </fieldset>

      <div className="mt-2 mb-6 h-20">
        <label htmlFor="picture" className="cursor-pointer">
          Profile picture (PNG/JPEG, up to 2MB)
        </label>
        <input
          {...register('picture')}
          id="picture"
          name="picture"
          aria-invalid={Boolean(errors.picture)}
          type="file"
          accept="image/png,image/jpeg"
          className={clsx(
            'w-full cursor-pointer rounded-lg border-2 p-2 file:mr-2 file:rounded-lg file:border-2 file:p-2',
            errors.picture && 'border-red-600'
          )}
        />
        {errors.picture && (
          <p className="text-error">{errors?.picture.message}</p>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="country" className="cursor-pointer">
          Country *
        </label>
        <input
          {...register('country')}
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
        {errors.country && (
          <p className="text-error">{errors?.country.message}</p>
        )}
      </div>

      <div className="mt-1 mb-2 flex h-12 flex-col">
        <div className="flex items-center">
          <input
            {...register('acceptTnC')}
            id="acceptTnC"
            name="acceptTnC"
            type="checkbox"
            className="mr-1 h-4 w-4 cursor-pointer"
          />
          <label htmlFor="acceptTnC" className="cursor-pointer">
            I accept the Terms and Conditions *
          </label>
        </div>
        {errors.acceptTnC && (
          <p className="text-error">{errors?.acceptTnC.message}</p>
        )}
      </div>

      <div className="my-2 flex justify-center">
        <button
          type="submit"
          disabled={!isValid}
          className="cursor-pointer rounded-lg border-2 p-2 hover:border-cyan-500 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-500"
        >
          Add User
        </button>
      </div>
    </form>
  );
};
