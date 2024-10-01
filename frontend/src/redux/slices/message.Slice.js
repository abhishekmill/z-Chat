import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [], // Initialize as an empty array to store multiple messages
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload); // Add new message to the array
    },
  },
});

export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;
