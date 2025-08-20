import { useAppSelector } from '@/hooks/useStore';
import type { User } from '@/types/users';
import { UserCard } from '@/components/UserCard';

export const UsersList = () => {
  const users: User[] = useAppSelector((state) => state.users.users);
  // TODO add users sorting

  if (users.length === 0) {
    return (
      <p className="text-lg">
        There are no users yet — why not create the first one?
      </p>
    );
  }

  return (
    <>
      <h2 className="text-3xl">Users List</h2>

      <div className="mt-4 grid [grid-template-columns:repeat(auto-fill,minmax(19rem,1fr))] gap-4">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};
