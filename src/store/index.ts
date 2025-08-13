import { configureStore } from '@reduxjs/toolkit';

import { peopleApi } from '@/services/people';
import selectedPeopleReducer from '@/store/selectedPeopleSlice';

export const store = configureStore({
  reducer: {
    selectedPeople: selectedPeopleReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
