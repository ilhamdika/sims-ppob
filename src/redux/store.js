import { configureStore } from "@reduxjs/toolkit";
import topupReducer from "./slices/topupSlice";

export const store = configureStore({
  reducer: {
    topup: topupReducer,
  },
});

export default store;
