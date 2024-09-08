import { Server } from "socket.io";
import http from "http";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../", "index.html"));
});

const getReciverSocketId = (reciverId) => {
  return userSocketMap[reciverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server, getReciverSocketId };
