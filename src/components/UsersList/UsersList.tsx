import { useAppSelector } from '@/hooks';
import type { UserRecord } from '@/types/users';
import { UserCard } from '@/components/UserCard';

export const UsersList = () => {
  const users: UserRecord[] = useAppSelector((state) => state.users.users);
  const recentlyAddedId: string | null = useAppSelector(
    (state) => state.users.recentlyAddedId
  );

  const sortedUsers: UserRecord[] = [...users].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (users.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center gap-7 py-4">
        <img src="/images/no-found.png" alt="No users" />
        <p className="text-center text-xl">
          There are no users yet — why not create the first one?
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h2 className="text-center text-3xl">Users List</h2>

      <div className="mt-4 grid [grid-template-columns:repeat(auto-fill,minmax(345px,1fr))] gap-4">
        {sortedUsers.map((user: UserRecord) => (
          <UserCard
            key={user.id}
            user={user}
            isNew={user.id === recentlyAddedId}
          />
        ))}
      </div>
    </div>
  );
};
