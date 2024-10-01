import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Sidebar from "./sidebar"; // Import Sidebar component
import Message from "./Message";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [socketMessages, setSocketMessages] = useState([]);
  const [receiverId, setReceiverId] = useState(""); // Selected user to chat with
  const [onlineUsers, setOnlineUsers] = useState([]); // List of online users
  const [socket, setSocket] = useState(null); // Socket state
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState([]);
  const [reciverName, setReciverName] = useState("");
  const [currUserData, setcurrUserData] = useState([]);
  const [pingUsers, setPingUsers] = useState([]);

  const currentUserId = localStorage.getItem("userID");
  const endOfMessagesRef = useRef(null);
  // feth current user data

  useEffect(() => {
    const userdata = async () => {
      try {
        const res = await axios.get(`/api/userinfo/${currentUserId}`);
        setcurrUserData(res.data); // Set user data into state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (currentUserId) {
      userdata(); // Call the function to fetch data
    }
  }, [currentUserId]);
  // Fetch conversation when receiverId changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/recive/${receiverId}`);
        setMessages(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (receiverId) {
      fetchMessages();
    }
  }, [receiverId]);

  // Initialize the socket and set up event listeners
  useEffect(() => {
    if (!currentUserId) {
      return console.log("User not found.");
    }

    const newSocket = io("http://:4000", {
      query: { userId: currentUserId },
    });
    setSocket(newSocket);

    // Handle receiving messages
    newSocket.on("receiveMessage", (data) => {
      setTrigger(data);
      if (currentUserId == data.receiverId) {
        setPingUsers((prevPingUsers) => [...prevPingUsers, data.senderId]);
        // setPingUsers(data.senderId);
      }

      setSocketMessages((prevMessages) => [...prevMessages, data]);
      if (data.receiverId === receiverId) {
      }
    });

    // Handle online users list
    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users); // Set the list of online users
    });

    // Clean up the socket on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [currentUserId]);

  useEffect(() => {
    // Scroll to the bottom of the chat box
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [socketMessages, receiverId]);

  // Handle sending messages
  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Check if all conditions are met
    if (receiverId && message && socket) {
      const payload = {
        senderId: currentUserId,
        receiverId,
        message,
      };

      // Clear the input field immediately after sending the message
      setMessage("");

      try {
        // Emit the message through the socket (for real-time communication)
        socket.emit("sendMessage", payload);

        // Save the message via API for persistence
        await axios.post(`/api/send/${receiverId}`, { message });

        // Update the local state with the new message
        setSocketMessages((prevMessages) => [...prevMessages, payload]);
      } catch (error) {
        console.error("Failed to send the message:", error);
        // Optionally show a notification or alert to the user
      }
    } else {
      console.warn("Incomplete message details or socket connection issue.");
    }
  };

  // -----------------------------------------
  return (
    <div className=" flex justify-center w-full    ">
      {/* Sidebar Component */}

      <div className="">
        <Sidebar
          setPingUsers={setPingUsers}
          pingUsers={pingUsers}
          onlineUsers={onlineUsers} // Passing the online users to Sidebar
          setReceiverId={setReceiverId}
          currentUserId={currentUserId}
          setReciverName={setReciverName}
        />
      </div>
      <div className="fixed  bottom-5  backdrop-blur-md md:w-[60vw]    rounded-xl   ">
        <h3 className="text-center">
          Send a Message to {reciverName || "Select a User"}
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="border rounded p-2 w-ful l"
          />
          <button
            onClick={(e) => {
              handleSendMessage(e);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Send Message
          </button>
        </div>
      </div>

      {/* chat area  */}
      <div className="m-auto ">
        <div>
          {/* Main Chat Area */}
          <div className=" flex-grow flex flex-col  ">
            <div className="bg-yellow-100 px-9 fixed top-5 rounded-lg">
              <h1 className="font-sans text-center font-semibold">Dashboard</h1>
              <p>
                {currentUserId
                  ? `Logged in as: ${currUserData.fullname}`
                  : "No user logged in"}
              </p>
            </div>

            {/* Input for Message */}

            {/* Display Messages */}
            <div className="message bg-slate-300  md:w-[70vw] w-[100vw] overflow-hidden  pb-24 px-5   ">
              <h3>Messages with {reciverName}:</h3>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error fetching messages: {error.message}</p>
              ) : messages.length === 0 ? (
                // Check if messages array is empty
                <div>Start a conversation</div>
              ) : (
                <ul>
                  {messages.map((msg, index) => {
                    if (receiverId === msg.senderId) {
                      // Message received by the current user from the selected receiver
                      return (
                        <li
                          key={index}
                          className="bg-gray-200 mr-auto h-16  text-left pr-7 max-w-[40vw]  md:max-w-[30vw] p-2 rounded-lg my-2"
                        >
                          {/* <span className="block font-semibold">
                            {reciverName}:
                          </span> */}
                          <span className="break-words">{msg.message}</span>
                        </li>
                      );
                    } else if (currentUserId === msg.senderId) {
                      // Message sent by the current user to the selected receiver
                      return (
                        <li
                          key={index}
                          className="bg-green-200 ml-auto text-right pl-7 w-fit  p-2 rounded-lg my-2"
                        >
                          {/* <span className="block font-semibold">
                            {currUserData?.fullname}:
                          </span> */}
                          <span>{msg.message}</span>
                        </li>
                      );
                    }

                    // If the message doesn't match either condition, return null
                    return null;
                  })}

                  {socketMessages.map((msg, index) => {
                    if (
                      currentUserId === msg.receiverId &&
                      receiverId === msg.senderId
                    ) {
                      return (
                        <li
                          key={index}
                          className="bg-gray-200 mr-auto text-left max-w-xs p-2 rounded-lg my-2"
                        >
                          <span className="block font-semibold">
                            {reciverName}:
                          </span>
                          <span>{msg.message}</span>
                        </li>
                      );
                    } else if (
                      currentUserId === msg.senderId &&
                      receiverId === msg.receiverId
                    ) {
                      return (
                        <li
                          key={index}
                          className="bg-green-200 ml-auto text-right max-w-xs p-2 rounded-lg my-2"
                        >
                          <span className="block font-semibold">
                            {currUserData?.fullname}:
                          </span>
                          <span>{msg.message}</span>
                        </li>
                      );
                    }
                  })}
                  <div ref={endOfMessagesRef}></div>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
