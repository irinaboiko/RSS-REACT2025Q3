import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export const useLocalStorage = (
  key: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [localStorageValue, setLocalStorageValue] = useState((): string => {
    const storedValue = localStorage.getItem(key);
    return storedValue || '';
  });

  useEffect(() => {
    localStorage.setItem(key, localStorageValue);
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
};
