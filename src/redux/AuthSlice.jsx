import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const user = state.users.find((u) => u.email === action.payload.email && u.password === action.payload.password);
      if (user) state.currentUser = user;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
