'use client';

import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export const useLocalStorage = (
  key: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [localStorageValue, setLocalStorageValue] = useState((): string => {
    if (typeof window !== 'undefined') {
      const storedValue = window.localStorage.getItem(key);
      return storedValue || '';
    }

    return '';
  });

  useEffect(() => {
    localStorage.setItem(key, localStorageValue);
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
};
