import express from "express";
import DBconnect from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import router from "./routes/message.routes.js";
import userRouter from "./routes/users.routes.js";
import cookieParser from "cookie-parser";

const allowedOrigins = [
  "http://localhost:3000",
  "https://z-chat-roan.vercel.app",
  "http://192.168.1.11:3000",
  "http://192.168.1.11:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    credentials: true,
  })
);

dotenv.config();
const port = 4000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/", router);
app.use("/api/", userRouter);

app.use(cors());

server.listen(port, () => {
  DBconnect();
  console.log("server is listening");
});
