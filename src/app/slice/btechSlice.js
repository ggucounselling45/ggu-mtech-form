import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: {
    applications: [],
    totalApplications: 0,
  },
};

const btechSlice = createSlice({
  name: "btech",
  initialState,
  reducers: {
    setBtechApplications: (state, action) => {
      state.applications = action.payload;
    },

    clearBtechApplications: (state) => {
      state.applications = {
        applications: [],
        totalApplications: 0,
      };
    },
  },
});

export const { setBtechApplications, clearBtechApplications } = btechSlice.actions;

export default btechSlice.reducer;