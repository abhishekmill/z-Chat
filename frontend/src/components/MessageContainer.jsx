import React, { useEffect, useState } from "react";
import useGetConversation from "../hooks/getConver";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MessageContainer = ({ messages, loading, error }) => {
  const userId = localStorage.getItem("userID");
  console.log("from msg container", userId);
  


  // fetching user info

  // dispatch(setMessages(messages))
  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching messages: {error.message}</div>;

  return (
    <div>
      <div>
        <h3>Conversation Data</h3>
        {messages.length > 0 ? (
          <ul>
            {messages.map((msg) => (
              <li key={msg._id}>{msg.message}</li>
            ))}
          </ul>
        ) : (
          <p>No messages</p>
        )}
      </div>
    </div>
  );
};

export default MessageContainer;
