import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register
const register = async (req, res) => {
  try {
    const { fullname, username, password, gender } = req.body;

    if (!fullname || !username || !password || !gender) {
      res.send("please fill all inputs");
    }

    const user = await User.findOne({ username });
    if (user) {
      console.log("username already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullname,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    res.status(201).json({
      message: "user successfully registered",
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.send("input valid credentials");
    }
    const validUser = await User.findOne({ username });

    if (!validUser) {
      res.status(401).send("user not exist");
    }

    const validPass = await bcrypt.compare(password, validUser.password);
    if (!validPass) {
      return res.status(401).send("incorrect password");
    }
    const tokenData = {
      userId: validUser._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRETE_KEY, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        token,
        userID: validUser._id,
        username: validUser.username,
        fullname: validUser.fullname,
        profilePhoto: validUser.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    console.log(loggedInUserId);
    
    const getOtherUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    if (!getOtherUsers.length) {
      return res.status(400).send("no user found");
    }
    res.status(200).json(getOtherUsers);
  } catch (error) {
    console.log(error);
  }
};
export { register, login, logout, getOtherUsers };
