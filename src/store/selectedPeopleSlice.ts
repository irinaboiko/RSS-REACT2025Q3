import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { PersonPreview } from '@/types/person';

interface SelectedPeopleState {
  people: PersonPreview[];
}

const initialState: SelectedPeopleState = {
  people: [],
};

const selectedPeopleSlice = createSlice({
  name: 'selectedPeople',
  initialState,
  reducers: {
    selectPerson: (state, action: PayloadAction<PersonPreview>) => {
      const alreadyExists = state.people.some(
        (p: PersonPreview) => p.uid === action.payload.uid
      );

      if (!alreadyExists) {
        state.people.push(action.payload);
      }
    },
    unselectPerson: (state, action: PayloadAction<PersonPreview>) => {
      state.people = state.people.filter(
        (person: PersonPreview) => person.uid !== action.payload.uid
      );
    },
    clearAll: (state) => {
      state.people = [];
    },
  },
});

export const { selectPerson, unselectPerson, clearAll } =
  selectedPeopleSlice.actions;

export default selectedPeopleSlice.reducer;
