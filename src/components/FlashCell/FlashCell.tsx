import { memo } from 'react';
import type { ReactNode } from 'react';

import { useFlashOnChange } from '@/hooks/useFlashOnChange';

export interface FlashCellProps {
  rawValue: unknown;
  children: ReactNode;
}

export const FlashCell = memo(function FlashCell({
  rawValue,
  children,
}: FlashCellProps) {
  const flash = useFlashOnChange(rawValue);
  return (
    <div
      className={`transition-colors duration-700 ${flash ? 'bg-sky-200' : 'bg-transparent'}`}
    >
      {children}
    </div>
  );
});
