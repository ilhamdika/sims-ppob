import { configureStore } from "@reduxjs/toolkit";
import topupReducer from "./slices/topupSlice";
import authReducer from "./slices/authSlice";
import saldoReducer from "./slices/saldoSlice";

export const store = configureStore({
  reducer: {
    topup: topupReducer,
    auth: authReducer,
    saldo: saldoReducer,
  },
});

export default store;
