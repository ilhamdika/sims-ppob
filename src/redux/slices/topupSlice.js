import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: "",
};

const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { setAmount } = topupSlice.actions;
export default topupSlice.reducer;
