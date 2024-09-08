import express from "express";
import {
  getOtherUsers,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import isAunthicated from "../middleware/isAunthicated.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(isAunthicated, logout);
userRouter.route("/").get(isAunthicated, getOtherUsers);

export default userRouter;
