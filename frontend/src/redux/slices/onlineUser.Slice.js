import { createSlice } from "@reduxjs/toolkit";

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState: {
    users: [], // Array to store online users' IDs
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.users = action.payload;
    },
    addOnlineUser: (state, action) => {
      state.users.push(action.payload); // Add a new user to the list
    },
    removeOnlineUser: (state, action) => {
      state.users = state.users.filter((user) => user !== action.payload); // Remove user from the list
    },
  },
});

// Action creators
export const { setOnlineUsers, addOnlineUser, removeOnlineUser } =
  onlineUsersSlice.actions;

// Reducer
export default onlineUsersSlice.reducer;
