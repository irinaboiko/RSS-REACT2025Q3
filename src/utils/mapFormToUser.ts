import { v4 as uuidv4 } from 'uuid';

import type { FormValues } from '@/types/forms';
import type { User } from '@/types/users';

export function mapFormToUser(values: FormValues): User {
  return {
    id: uuidv4(),
    name: values.name,
    age: values.age,
    email: values.email,
    password: values.password,
    gender: values.gender,
    acceptTnC: values.acceptTnC,
    pictureUrl: values.pictureBase64,
    country: values.country,
    createdAt: new Date().toISOString(),
  };
}
