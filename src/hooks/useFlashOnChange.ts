import { useEffect, useRef, useState } from 'react';

export function useFlashOnChange<T>(value: T, duration = 800) {
  const [flash, setFlash] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    setFlash(true);
    const id = window.setTimeout(() => setFlash(false), duration);
    return () => window.clearTimeout(id);
  }, [value, duration]);

  return flash;
}
