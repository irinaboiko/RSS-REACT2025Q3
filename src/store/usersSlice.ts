import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { UserRow } from '@/types/users';

interface UserSliceState {
  users: UserRow[];
  recentlyAddedId: string | null;
}

const initialState: UserSliceState = {
  users: [],
  recentlyAddedId: '123',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserRow>) => {
      state.users.push(action.payload);
      state.recentlyAddedId = action.payload.id;
    },

    clearRecentlyAdded(state) {
      state.recentlyAddedId = null;
    },
  },
});

export const { addUser, clearRecentlyAdded } = usersSlice.actions;

export default usersSlice.reducer;
