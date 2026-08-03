import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const mtechSlice = createSlice({
  name: "mtech",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },

    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },

    updateApplication: (state, action) => {
      const index = state.applications.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    },

    removeApplication: (state, action) => {
      state.applications = state.applications.filter(
        (item) => item._id !== action.payload
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearApplications: (state) => {
      state.applications = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setApplications,
  addApplication,
  updateApplication,
  removeApplication,
  setLoading,
  setError,
  clearApplications,
} = mtechSlice.actions;

export default mtechSlice.reducer;