import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Assuming you store socket in Redux

const useSocketMessages = (userId) => {
  const socket = useSelector((store) => store.socket.socket); // Assuming socket is stored in Redux
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(socket);

    if (socket && userId) {
      // Listen for 'newMessage' event for real-time messages
      socket.on("newMessage", (newMessage) => {
        // Check if the message is meant for the current user
        if (newMessage.reciverId === userId) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      // Clean up the socket listener when component unmounts
      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, userId]);

  return messages;
};

export default useSocketMessages;
