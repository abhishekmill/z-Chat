import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setMessages } from "../redux/slices/message.Slice"; // Import your setMessages action
import { addOnlineUser } from "../redux/slices/onlineUser.Slice";

const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  // const updatedmessages = useSelector((state) => state.message.messages);
  useEffect(() => {
    // Establish the socket connection
    const socketInstance = io("https://z-chat-soba.onrender.com/", {
      query: { userId }, // Pass the userId as a query parameter to the server
    });

    // Store the socket instance in state
    setSocket(socketInstance);
    // get online users
    socketInstance.on("getOnlineUsers", (users) => {
      console.log(Array.isArray(users));
      localStorage.setItem("onlineusers", JSON.stringify(users));
      //  setOnlineUsers(users); // Update the online users list
    });

    // Listen for 'receiveMessage' event from the server

    // Clean up the socket connection on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [userId, dispatch]);

  // This is the client-side function to send a message

  return { socket };
};

export default useSocket;
