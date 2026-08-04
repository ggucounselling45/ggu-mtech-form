import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    addUser: (state, action) => {
      state.users.unshift(action.payload);
    },

    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id,
      );

      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
