import type { UserRecord } from '@/types/users';

export const mockUsers: UserRecord[] = [
  {
    id: '123',
    name: 'Masha',
    age: 30,
    email: 'masha@gmail.com',
    password: 'aA1!',
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
    password: 'aA2!',
    gender: 'male',
    acceptTnC: true,
    pictureUrl: undefined,
    country: 'Belarus',
    createdAt: '2025-08-20T14:29:08.123Z',
    source: 'uncontrolled',
  },
];
