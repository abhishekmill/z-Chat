import axios from "axios";
import React, { useEffect, useState } from "react";
import NavIcon from "./NavIcon";

const Sidebar = ({
  setPingUsers,
  pingUsers,
  onlineUsers,
  setReceiverId,
  setReciverName,
  currentUserId,
}) => {
  const [userInfos, setUserInfos] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // for dropdown
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for sidebar

  // Fetch user information
  const fetchUserInfo = async () => {
    if (Array.isArray(onlineUsers) && onlineUsers.length > 0) {
      try {
        const userInfoPromises = onlineUsers.map((uid) =>
          axios.get(`/api/userinfo/${uid}`)
        );
        const responses = await Promise.all(userInfoPromises);
        const userData = responses.map((response) => response.data);
        setUserInfos(userData);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    } else {
      console.log("No online users available.");
      setUserInfos([]); // Clear userInfos if no online users
    }
  };
  // pingUsers functions

  const hasUnreadMessages = (userId) => {
    return pingUsers.includes(userId);
  };

  // Function to handle marking messages as read
  const markAsRead = (userId) => {
    setPingUsers((prevPingUsers) => {
      const newPingUsers = [...prevPingUsers]; // Create a copy of the array
      const index = newPingUsers.indexOf(userId); // Find the index of the userId
      if (index !== -1) {
        newPingUsers.splice(index, 1); // Remove the userId from the array
      }
      return newPingUsers; // Return the updated array
    });
  };

  // pingUsers functions

  // Fetch user info whenever onlineUsers changes
  useEffect(() => {
    fetchUserInfo();
  }, [onlineUsers, pingUsers]);

  // Toggle Dropdown Menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Sidebar Toggle Button */}

      <span
        className=" block md:hidden fixed  text-white text-4xl top-5 z-20 left-2 cursor-pointer"
        onClick={toggleSidebar}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 text-white rounded-md">
          =
        </i>
      </span>
      {/* Sidebar */}
      <div className=" md:w-[250px] w-0 "></div>
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-[100%]"} 
         md:translate-x-0
        duration-500 sidebar z-10 fixed top-0 bottom-0 lg:left-0 p-2 w-[250px] overflow-y-auto text-center bg-gray-900`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
            <h1 className="font-bold text-gray-200 pl-5 text-[15px] ml-3">
              Z-chat
            </h1>
            <i
              className="bi bi-x cursor-pointer ml-28 lg:hidden"
              onClick={toggleSidebar}
            ></i>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <i className="bi bi-search text-sm"> </i>
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>

        {/* ....onlie users */}

        {/* ..... */}
        <div className="  ">
          <ul>
            {userInfos.map((user) => {
              if (user._id !== currentUserId) {
                return (
                  <li
                    key={user._id}
                    onClick={() => {
                      setReceiverId(user._id);
                      setReciverName(user.username);
                      0;
                      markAsRead(user._id);
                    }}
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white  "
                  >
                    {/* ping ===== */}
                    {hasUnreadMessages(user._id) && (
                      <span className="relative flex justify-center items-center  h-3 w-3">
                        <span className="animate-ping  absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                      </span>
                    )}

                    {/* ping---- */}

                    <i className="bi bi-person-fill"></i>
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">
                      {user.username}
                    </span>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <div className="p-2.5 mt-3 flex items-center  rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Logout
          </span>
        </div>

        {/* User Info Section */}
      </div>
    </div>
  );
};

export default Sidebar;
