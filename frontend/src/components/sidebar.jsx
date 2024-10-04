import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  currUserData,
  setPingUsers,
  pingUsers,
  onlineUsers,
  setReceiverId,
  setReciverName,
  currentUserId,
  toggleSidebar2,
}) => {
  const [userInfos, setUserInfos] = useState([]);
  const [Users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for sidebar
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();
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
    getAllUsers();
  }, [onlineUsers, pingUsers]);

  // Toggle Dropdown Menu

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/api");

      setAllUsers(res.data); // Set user data into state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const searchUser = (e) => {
    const dta = allUsers.filter((users) => {
      return users.username
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setUsers(dta);
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    toggleSidebar2();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = async () => {
    try {
      const res = await axios.post("/api/logout");
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Sidebar Toggle Button */}

      <span
        className=" block md:hidden fixed  text-white text-3xl top-5 left-2 cursor-pointer"
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
        <div className="text-gray-100 text-xl py-2 flex">
          <img
            src={currUserData.profilePhoto}
            alt=""
            className=" max-w-14 ml-2  border-2 border-yellow-300  rounded-full   my-2 "
          />

          <div className="py-2.5 mt-1 flex items-center">
            {/* <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i> */}

            <h1 className="font-bold text-gray-200   capitalize  text- ml-3">
              {currUserData.fullname}
            </h1>

            <svg
              onClick={toggleSidebar}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="cursor-pointer ml-14  w-10 capitalize md:hidden"
            >
              <path d="M4.83578 12L11.0429 18.2071L12.4571 16.7929L7.66421 12L12.4571 7.20712L11.0429 5.79291L4.83578 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z"></path>
            </svg>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <i className="bi bi-search text-sm"> </i>
          <input
            type="text"
            placeholder="Search"
            onChange={searchUser}
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>

        {/* ....onlie users */}

        {/* ..... */}
        <div className=" ">
          <ul>
            <div className="max-h-48 overflow-y-scroll border-b no-scrollbar hover:custom-scrollbar ">
              {/* searched users  */}
              {Users.map((user) => {
                const isonline = onlineUsers.includes(user._id);
                return (
                  <li
                    key={user._id}
                    onClick={() => {
                      toggleSidebar();
                      setReceiverId(user._id);
                      setReciverName(user.username);
                      0;
                      markAsRead(user._id);
                    }}
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white  "
                  >
                    <img
                      src={user.profilePhoto}
                      alt=""
                      className={` ${
                        isonline ? "outline" : ""
                      }  outline-lime-300  rounded-full w-10`}
                    />
                    <span className="text-[15px] mx-4 text-gray-200 capitalize font-bold">
                      {user.username}
                    </span>
                  </li>
                );
              })}
            </div>

            {/* online users  */}
            {userInfos.map((user) => {
              if (user._id !== currentUserId) {
                return (
                  <li
                    key={user._id}
                    onClick={() => {
                      toggleSidebar();
                      setReceiverId(user._id);
                      setReciverName(user.username);
                      0;
                      markAsRead(user._id);
                    }}
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white  "
                  >
                    <img
                      src={user.profilePhoto}
                      alt=""
                      className="w-10 outline-lime-300 outline rounded-full  "
                    />

                    <span className="text-[15px] mx-4 text-gray-200 capitalize font-bold">
                      {user.username}
                    </span>

                    {hasUnreadMessages(user._id) && (
                      <span className="relative flex justify-center items-center  h-3 w-3">
                        <span className="animate-ping  absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                      </span>
                    )}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <div className="p-2.5  flex bottom-2 fixed  w-[90%]  items-center  rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <i className="bi bi-box-arrow-in-right"></i>
          <span
            className="text-[15px] ml-4 text-gray-200 font-bold"
            onClick={logout}
          >
            Logout
          </span>
        </div>

        {/* User Info Section */}
      </div>
    </div>
  );
};

export default Sidebar;
