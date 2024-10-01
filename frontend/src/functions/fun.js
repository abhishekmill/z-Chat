// send messages

const sendMessage = (userId, socket, receiverId, message) => {
  if (socket) {
    // Emit the 'sendMessage' event with the required parameters
    socket.emit("sendMessage", {
      senderId: userId, // The current user's ID
      receiverId, // The ID of the user you're sending the message to
      message, // The message content
    });

    console.log("Message sent:", { receiverId, message });
  }
};

// listen for messages

// socket.on("receiveMessage", (message) => {
//   if (true) {
//     // Dispatch action to update the Redux store with the new message
//     console.log("Message received:", message);
//     return message;
//   } else {
//     console.error("Invalid message format received:", message);
//   }
// });

export { sendMessage };
