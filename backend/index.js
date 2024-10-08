import express from "express";
import DBconnect from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import router from "./routes/message.routes.js";
import userRouter from "./routes/users.routes.js";
import cookieParser from "cookie-parser";

// CORS setup
// CORS configuration
const allowedOrigins = ['https://z-chat-gamma.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request if the origin is in the allowed list
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE', // Restrict allowed methods if needed
  allowedHeaders: 'Content-Type, Authorization', // Restrict allowed headers
  credentials: true, // If using cookies or authorization headers
};

// Apply CORS middleware
app.use(cors(corsOptions));


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
