import type { FormType } from '@/types/forms';

export type Gender = 'male' | 'female';

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  acceptTnC: boolean;
  pictureUrl?: string;
  country: string;
  createdAt: string;
}

export type UserRecord = User & { source: FormType };
