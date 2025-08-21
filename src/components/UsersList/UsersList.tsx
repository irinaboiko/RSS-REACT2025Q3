import { useAppSelector } from '@/hooks';
import type { UserRow } from '@/types/users';
import { UserCard } from '@/components/UserCard';

export const UsersList = () => {
  const users: UserRow[] = useAppSelector((state) => state.users.users);
  const recentlyAddedId: string | null = useAppSelector(
    (state) => state.users.recentlyAddedId
  );

  const sortedUsers: UserRow[] = [...users].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (users.length === 0) {
    return (
      <div className="py-4">
        <p className="text-center text-3xl">
          There are no users yet — why not create the first one?
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h2 className="text-center text-3xl">Users List</h2>

      <div className="mt-4 grid [grid-template-columns:repeat(auto-fill,minmax(345px,1fr))] gap-4">
        {sortedUsers.map((user: UserRow) => (
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
