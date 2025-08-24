import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { UserRecord } from '@/types/users';

interface UserSliceState {
  users: UserRecord[];
  recentlyAddedId: string | null;
}

const initialState: UserSliceState = {
  users: [],
  recentlyAddedId: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserRecord>) => {
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
