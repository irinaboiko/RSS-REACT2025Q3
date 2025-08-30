import { useEffect, useRef, useState } from 'react';

export function useFlashOnChange<T>(value: T, duration = 800) {
  const [flash, setFlash] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setFlash(true);
    const id = window.setTimeout(() => setFlash(false), duration);
    return () => window.clearTimeout(id);
  }, [value, duration]);

  return flash;
}
