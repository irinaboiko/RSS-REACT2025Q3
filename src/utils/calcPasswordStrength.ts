import type { Strength } from '@/types/passwordStrehgth';

export function calcPasswordStrength(passwordValue: string): Strength {
  if (!passwordValue)
    return { score: 0, label: 'Please enter your password', fontColor: '' };

  let score = 0;
  if (/[a-z]/.test(passwordValue)) score++;
  if (/[A-Z]/.test(passwordValue)) score++;
  if (/\d/.test(passwordValue)) score++;
  if (/[^A-Za-z0-9]/.test(passwordValue)) score++;

  switch (score) {
    case 0:
    case 1:
    case 2:
      return { score, label: 'Weak', fontColor: 'text-red-600' };
    case 3:
      return { score, label: 'Medium', fontColor: 'text-amber-400' };
    case 4:
      return { score, label: 'Strong', fontColor: 'text-emerald-600' };
    default: {
      return { score: 0, label: 'Please enter your password', fontColor: '' };
    }
  }
}
