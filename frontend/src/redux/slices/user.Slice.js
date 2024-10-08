// src/redux/slices/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUserId: 21332,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUserId: (state, {payload}) => {
      console.log("Updating userID in Redux:", payload); // Debug the payload
      state.currentUserId = payload;
      console.log(state.currentUserId);

      // This should update the userID
    },
    clearCurrentUserId: (state) => {
      state.currentUserId = null;
    },
  },
});

export const { setCurrentUserId, clearCurrentUserId } = userSlice.actions;

export default userSlice.reducer;
