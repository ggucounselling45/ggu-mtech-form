import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slice/adminSlice";
import mtechReducer from "./slice/mtechSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    mtech: mtechReducer,
  },
});
