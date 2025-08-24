import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '@/store/usersSlice';
import countriesReducer from '@/store/countriesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
