import { configureStore } from '@reduxjs/toolkit';
import selectedPeopleReducer from './selectedPeopleSlice';

export const store = configureStore({
  reducer: {
    selectedPeople: selectedPeopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
