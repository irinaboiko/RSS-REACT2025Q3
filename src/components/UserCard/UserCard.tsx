import { useState } from 'react';

import type { UserRecord } from '@/types/users';
import { formatDate } from '@/utils/formatDate';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export interface UserCardProps {
  user: UserRecord;
  isNew: boolean;
}

export const UserCard = ({ user, isNew }: UserCardProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const imageUrl: string = user.pictureUrl
    ? user.pictureUrl
    : user.gender === 'male'
      ? '/images/user-icon-male.png'
      : '/images/user-icon-female.png';

  return (
    <div
      className={clsx(
        'relative my-2 rounded-lg border-2 p-4',
        isNew && 'border-emerald-600'
      )}
    >
      {isNew && (
        <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white italic">
          New
        </div>
      )}

      <div
        className={clsx(
          'absolute top-2 right-2 rounded-full px-2',
          user.source === 'controlled' ? 'bg-cyan-500' : 'bg-amber-400'
        )}
      >
        {user.source}
      </div>

      <div className="mb-3 flex items-start justify-start gap-2">
        <div className="w-24">
          <img src={imageUrl} alt={user.name} />
        </div>

        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-sm text-gray-500">Id: {user.id}</p>
          {user.acceptTnC && (
            <p className="text-sm text-emerald-600">
              Terms and Conditions accepted
            </p>
          )}
        </div>
      </div>
      <p>
        <span className="inline-block w-30 text-gray-500">Reach me at:</span>
        {user.email}
      </p>
      <p className="flex items-center">
        <span className="w-30 text-gray-500">Password: </span>
        <button
          type="button"
          aria-pressed={showPassword}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((prev) => !prev)}
          className="mr-2 cursor-pointer text-sm text-gray-500 hover:underline"
          data-testid="user-card"
        >
          {showPassword ? (
            <EyeSlashIcon className="size-5" />
          ) : (
            <EyeIcon className="size-5" />
          )}
        </button>
        {showPassword ? user.password : '•'.repeat(user.password.length)}
      </p>
      <p>
        <span className="inline-block w-30 text-gray-500">Based in:</span>
        {user.country}
      </p>
      <p>
        <span className="inline-block w-30 text-gray-500">Identifies as:</span>
        {user.gender}
      </p>
      <p>
        <span className="inline-block w-30 text-gray-500">Age:</span> {user.age}
      </p>
      <p>
        <span className="inline-block w-30 text-gray-500">Joined on:</span>
        {formatDate(user.createdAt)}
      </p>
    </div>
  );
};
