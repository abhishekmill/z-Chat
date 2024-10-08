import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Sidebar from "./sidebar"; // Import Sidebar component
import EmojiPicker from "emoji-picker-react";
import moment from "moment/moment";
import { apiUrl } from "../api/api";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState("false");
  const currentUserId = localStorage.getItem("userID");
  const endOfMessagesRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  // feth current user data

  // Handle emoji selection
  const onEmojiClick = (emojiObject) => {
    setMessage(message + emojiObject.emoji); // Append emoji to the input value
    setShowPicker(false); // Hide the picker after selecting an emoji
  };

  useEffect(() => {
    const userdata = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/userinfo/${currentUserId}`, {
          withCredentials: true,
        });
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
        const res = await axios.get(`${apiUrl}/api/recive/${receiverId}`, {
          withCredentials: true,
        });
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

    const newSocket = io(`${apiUrl}`, {
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

  const toggleSidebar2 = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        await axios.post(
          `${apiUrl}/api/send/${receiverId}`,
          { message },
          {
            withCredentials: true,
          }
        );

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(e);
    }
  };
  // -----------------------------------------
  return (
    <div className="flex  bg-gray-900   w-[100vw] h-[100vh] ">
      <div className="   ">
        <Sidebar
          toggleSidebar2={toggleSidebar2}
          setPingUsers={setPingUsers}
          pingUsers={pingUsers}
          onlineUsers={onlineUsers} // Passing the online users to Sidebar
          setReceiverId={setReceiverId}
          currentUserId={currentUserId}
          setReciverName={setReciverName}
          currUserData={currUserData}
        />
      </div>

      {/* overlay  */}
      <div
        className={`${
          isSidebarOpen ? "hidden" : "block "
        }  backdrop-blur-sm bg-black opacity-35 md:hidden   w-full absolute    h-screen`}
      ></div>
      {/* overlay */}

      <div className="justify-center w-full  flex flex-col py-4 ">
        {" "}
        {/* title  */}
        <div className=" bg-none mx-1 p-2 border-gray-600 border rounded-lg">
          <p className="font-bold text-lg text-white px-2  md:m-0 ml-10 capitalize">
            {reciverName || "Select a User"}
          </p>
        </div>
        {/* title  closed */}
        {/* Display Messages */}
        {!receiverId ? (
          //if user id is not selected
          <div className="w-full h-full bg-gray-700 flex items-center rounded-md my-2 justify-center">
            <div className=" w-[60vw] h-[30vh] border-dashed border justify-center items-center  text-white flex  ">
              select a user
            </div>
          </div>
        ) : (
          <div className="message bg-gray-700 h-full  text-white m-2 overflow-y-scroll   overflow-auto pb-24 px-5  rounded-lg  ">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error fetching messages: {error.message}</p>
            ) : messages.length === 0 ? (
              // Check if messages array is empty
              <div className="  bg-gray-700 flex items-center rounded-md my-2 justify-center">
                <div className=" w-[60vw] h-[30vh] border-dashed border  justify-center items-center  text-white flex  ">
                  Start a conversation
                </div>
              </div>
            ) : (
              <ul>
                {messages.map((msg, index) => {
                  const Time = moment(msg.createdAt).format(" h:mm A");
                  if (receiverId === msg.senderId) {
                    // Message received by the current user from the selected receiver
                    return (
                      <li
                        key={index}
                        className="bg-[#9758ED] mr-auto  w-fit    text-left px-3 max-w-[40vw]  md:max-w-[30vw] p-2 rounded-lg my-2"
                      >
                        <p className="text-[10px] text-gray-300 ">{Time}</p>

                        <span className="break-words pl-2">{msg.message}</span>
                      </li>
                    );
                  } else if (currentUserId === msg.senderId) {
                    // Message sent by the current user to the selected receiver
                    return (
                      <li
                        key={index}
                        className="bg-[#2B2B32] ml-auto text-right px-3 w-fit  p-2 rounded-lg my-2"
                      >
                        <p className="text-[10px] text-gray-300 ">{Time}</p>
                        <span className="break-words pr-2">{msg.message}</span>
                      </li>
                    );
                  }

                  // If the message doesn't match either condition, return null
                  return null;
                })}

                {/* //// socket message  */}

                {socketMessages.map((msg, index) => {
                  if (
                    currentUserId === msg.receiverId &&
                    receiverId === msg.senderId
                  ) {
                    const CurrentTime = moment().format(" h:mm A");
                    return (
                      <li
                        key={index}
                        className="bg-[#9758ED] mr-auto  w-fit    text-left px-3 max-w-[40vw]  md:max-w-[30vw] p-2 rounded-lg my-2"
                      >
                        <p className="text-[10px] text-gray-300 ">
                          {CurrentTime}
                        </p>
                        <span>{msg.message}</span>
                      </li>
                    );
                  } else if (
                    currentUserId === msg.senderId &&
                    receiverId === msg.receiverId
                  ) {
                    const CurrentTime = moment().format(" h:mm A");
                    return (
                      <li
                        key={index}
                        className="bg-[#2B2B32] ml-auto text-right px-3 w-fit  p-2 rounded-lg my-2"
                      >
                        <p className="text-[10px] text-gray-300 ">
                          {CurrentTime}
                        </p>
                        <span>{msg.message}</span>
                      </li>
                    );
                  }
                })}
                <div ref={endOfMessagesRef}></div>
              </ul>
            )}
          </div>
        )}
        {/* input  */}
        <div className="bg-[#26272D] mx-5  gap-5 bottom-10 rounded-lg">
          {receiverId ? (
            <div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowPicker(!showPicker)}
                  className=" right-2 w-10 top-2 text-xl"
                >
                  😀
                </button>

                {/* Emoji Picker */}

                <div
                  className={` ${
                    showPicker ? "translate-y-0 " : "-translate-x-96 opacity-0 "
                  } absolute bottom-[65px] w-[500px] duration-300  opacity-1 overflow-hidden`}
                >
                  <EmojiPicker
                    theme="dark"
                    skinTonesDisabled={true}
                    width={"100%"}
                    height={"100%"}
                    searchDisabled={true}
                    allowExpandReactions={false}
                    onEmojiClick={onEmojiClick}
                    reactionsDefaultOpen={true}
                  />
                </div>

                <input
                  type="text"
                  onKeyDown={handleKeyDown}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message... 😊"
                  className="border text-white rounded bg-transparent p-2 w-full  "
                />
                <button
                  onClick={(e) => {
                    handleSendMessage(e);
                  }}
                  className="bg-blue-500 mx-1 text-white px-2 py-1 rounded"
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
