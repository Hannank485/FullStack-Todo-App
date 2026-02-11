import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authModels from "../Models/authModels";
import taskModel from "../Models/taskModel";
import { createHash } from "node:crypto";
const ACCESS_SECRET = process.env.ACCESS_SECRET_TOKEN;

const authService = {
  // TO REGISTER USER
  async register(username: string, password: string) {
    try {
      // Verifying if username exists
      const checkUsername = await authModels.findUser(username);
      if (checkUsername) {
        const error = new Error("This username is already taken.");
        throw error;
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Add user to DB, function returns id
      const result = await authModels.register(username, hashedPassword);
      if (!result) {
        throw new Error("SERVER ERROR");
      }
      // add initial Task
      await taskModel.initialTask(result);
    } catch (err) {
      if (err instanceof Error) {
        console.log("Server Encountered an Error");
        throw err;
      } else {
        console.log("Ran Into an error", err);
        throw err;
      }
    }
  },

  // TO LOGIN USER
  async login(username: string, password: string) {
    // Verifying if username exists
    const user = await authModels.findUser(username);
    if (!user) {
      const error = new Error("Invalid Username or Password");
      throw error;
    }
    // VERIFY PASSWORD
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      const error = new Error("Invalid Username or Password");
      throw error;
    }
    // ISSUE ACCESS AND REFRESH TOKEN
    if (!ACCESS_SECRET) {
      throw new Error("ACCESS_SECRET is not defined");
    }

    // Generate Access Token and RefreshToken
    const accessToken = await jwt.sign({ id: user.id }, ACCESS_SECRET, {
      expiresIn: "15m",
    });

    return { accessToken };
  },
  // CHECK USER
  async me(token: string) {
    try {
      if (!ACCESS_SECRET) {
        throw new Error("ACCESS_SECRET is not defined");
      }
      await jwt.verify(token, ACCESS_SECRET);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  },
};

export default authService;
