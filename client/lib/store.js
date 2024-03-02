import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

export const makeStore = () => {
  console.log("making store!");
  return configureStore({
    reducer: {
      auth: authSlice,
    },
  });
};
