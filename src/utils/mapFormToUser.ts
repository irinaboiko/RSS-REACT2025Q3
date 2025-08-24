import { v4 as uuidv4 } from 'uuid';

import type { FormValues } from '@/types/forms';
import type { User } from '@/types/users';
import { fileToBase64 } from '@/utils/fileToBase64';

export async function mapFormToUser(values: FormValues): Promise<User> {
  const file = values.picture?.item(0) ?? null;

  let pictureUrl = '';
  if (file && file.size > 0) {
    pictureUrl = await fileToBase64(file);
  }

  return {
    id: uuidv4(),
    name: values.name,
    age: values.age,
    email: values.email,
    password: values.password,
    gender: values.gender,
    acceptTnC: values.acceptTnC,
    pictureUrl,
    country: values.country,
    createdAt: new Date().toISOString(),
  };
}
