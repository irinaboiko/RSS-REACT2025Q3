import { configureStore } from '@reduxjs/toolkit';
import selectedPeopleReducer from '@/store/selectedPeopleSlice';

export const createTestStore = () =>
  configureStore({
    reducer: {
      selectedPeople: selectedPeopleReducer,
    },
  });
