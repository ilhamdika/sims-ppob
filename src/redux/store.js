import { configureStore } from "@reduxjs/toolkit";
import topupReducer from "./slices/topupSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    topup: topupReducer,
    auth: authReducer,
  },
});

export default store;
