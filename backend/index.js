import express from "express";
import DBconnect from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import router from "./routes/message.routes.js";
import userRouter from "./routes/users.routes.js";
import cookieParser from "cookie-parser";

// CORS setup
const allowedOrigins = [
  "https://z-chat-gamma.vercel.app",
  "http://localhost:3000",
  "http://192.168.1.11:3000",
  "http://192.168.1.11:5173",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

dotenv.config();
const port = 4000;

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use("/api", userRouter);

app.use(cors());

server.listen(port, () => {
  DBconnect();
  console.log("server is listening", port);
});
