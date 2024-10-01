// store.js
import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./slices/socket.Slice";
import messagereducer from "./slices/message.Slice";
import onlineUsersReducer from "./slices/onlineUser.Slice";
import userReducer from "./slices/user.Slice";

export const store = configureStore({
  reducer: {
    socket: socketReducer,
    message: messagereducer,
    onlineUsers: onlineUsersReducer,
    user: userReducer,
  },
});
