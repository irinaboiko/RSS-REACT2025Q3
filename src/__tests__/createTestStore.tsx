import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '@/store/usersSlice';
import countriesReducer from '@/store/countriesSlice';
import type { RootState } from '@/store';

export const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      users: usersReducer,
      countries: countriesReducer,
    },
    preloadedState: preloadedState as RootState,
  });

export type AppTestStore = ReturnType<typeof createTestStore>;
