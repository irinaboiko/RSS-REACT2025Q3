import type { UserRow } from '@/types/users';

export const mockUsers: UserRow[] = [
  {
    id: '123',
    name: 'Masha',
    age: 30,
    email: 'masha@gmail.com',
    password: 'qwerty',
    gender: 'female',
    acceptTnC: true,
    pictureUrl: undefined,
    country: 'Belarus',
    createdAt: '2025-08-20T14:27:53.123Z',
    source: 'controlled',
  },
  {
    id: '124',
    name: 'Pasha',
    age: 26,
    email: 'pasha@gmail.com',
    password: 'qwerty1',
    gender: 'male',
    acceptTnC: true,
    pictureUrl: undefined,
    country: 'Belarus',
    createdAt: '2025-08-20T14:29:08.123Z',
    source: 'uncontrolled',
  },
];
