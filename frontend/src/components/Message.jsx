import React, { useState } from "react";

const Message = ({ messages, loading, error, handleSendMessage }) => {
  return (
    <div className="w-full">
      <div className="flex h-screen overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1">
          {/* Chat Header */}
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">Alice</h1>
          </header>

          {/* Chat Messages */}
          <div className="h-screen overflow-y-auto p-4 pb-36">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error fetching messages: {error.message}</p>
            ) : (
              <ul>
                {messages.map((msg, index) => (
                  <li key={index}>
                    {msg.senderId}: {msg.message}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Chat Input */}
        </div>
      </div>
    </div>
  );
};

export default Message;
