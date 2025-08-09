import { configureStore } from '@reduxjs/toolkit';
import selectedPeopleReducer from '@/store/selectedPeopleSlice';
import { peopleApi } from '@/services';

export const createTestStore = () =>
  configureStore({
    reducer: {
      selectedPeople: selectedPeopleReducer,
      [peopleApi.reducerPath]: peopleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(peopleApi.middleware),
  });
