import type { User } from '@/types/users';
import { formatCreatedAt } from '@/utils/formatDate';

export interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const imageUrl: string = user.pictureUrl
    ? user.pictureUrl
    : user.gender === 'male'
      ? '/images/user-icon-male.png'
      : '/images/user-icon-female.png';

  return (
    <div className="my-2 rounded-lg border-2 p-4">
      <div className="mb-3 flex items-start justify-start gap-2">
        <div>
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
        <span className="inline-block w-30 text-gray-500">Reach me at:</span>{' '}
        {user.email}
      </p>
      <p>
        <span className="inline-block w-30 text-gray-500">Based in:</span>{' '}
        {user.country}
      </p>
      <p>
        <span className="inline-block w-30 text-gray-500">Identifies as:</span>{' '}
        {user.gender}
      </p>
      <p>
        <span className="inline-block w-30 text-gray-500">Age:</span> {user.age}
      </p>
      <p>
        <span className="inline-block w-30 text-gray-500">Joined on:</span>{' '}
        {formatCreatedAt(user.createdAt)}
      </p>
    </div>
  );
};
