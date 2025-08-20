import type { Gender } from '@/types/users';

export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  acceptTnC: boolean;
  picture?: File | null;
  pictureBase64?: string;
  country: string;
}
