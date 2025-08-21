import type { Gender } from '@/types/users';

export type FormType = 'controlled' | 'uncontrolled';

export const FORM_TYPES_LABELS: Record<FormType, string> = {
  controlled: 'Controlled',
  uncontrolled: 'Uncontrolled',
};

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
