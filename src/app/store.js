import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slice/adminSlice";
import mtechReducer from "./slice/mtechSlice";
import btechReducer from "./slice/btechSlice";
import usersReducer from "./slice/usersSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    mtech: mtechReducer,
    btech: btechReducer,
    users: usersReducer,
  },
});
