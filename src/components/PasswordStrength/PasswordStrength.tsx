import { calcPasswordStrength } from '@/utils/calcPasswordStrength';

type PasswordStrengthProps = { password: string };

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { label, fontColor } = calcPasswordStrength(password);
  return (
    <p className="text-sm">
      Password strength: <span className={fontColor}>{label}</span>
    </p>
  );
}
