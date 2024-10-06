import React, { useState } from "react";
import useSocket from "../hooks/useSocket"; // Adjust the path as necessary
import axios from "axios";
import { useSelector } from "react-redux";
import { sendMessage } from "../functions/fun";
import { io } from "socket.io-client";

const Inputmsg = () => {
  const userId = localStorage.getItem("userID");

  const socket = io("https://z-chat-soba.onrender.com", {
    query: { userId }, // Pass the userId as a query parameter to the server
  });


  const [message, setMessage] = useState("");
  const receiverId = "66ed7167dd34e43fb5b07e33"; // ID of the user to whom you're sending the message

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await axios.post(`/api/send/${receiverId}`, {
          message,
        });

        sendMessage(userId, socket, receiverId, message); // Send the message using the sendMessage function

        setMessage("");
      } catch (error) {
        console.log(error);
      }

      // Clear the input field after sending the message
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default Inputmsg;
