import { access } from "node:fs";
import authService from "../Services/authService";
import { Request, Response } from "express";

const authController = {
  // REGISTER
  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Invalid Data" });
    }
    if (username.legnth > 15) {
      return res.status(400).json({
        message: "Username should contain less than 15 characters",
      });
    }
    if (password.length < 6 && password.length > 15) {
      return res.status(400).json({
        message:
          "Password should contain more than 6 and less than 15 characters",
      });
    }
    try {
      await authService.register(username, password);
      return res.status(200).json({ message: "User Successfully Registered" });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    }
  },

  // LOGIN
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Invalid Data" });
    }
    try {
      const { accessToken } = await authService.login(username, password);
      if (!accessToken) {
        return res.status(500).json({ message: "SOMETHING WENT WRONG " });
      }

      // SEND REFRESH TOKEN VIA COOKIE AND ACCESSTOKEN TO STORE IN LOCALSTORAGE
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 60 * 1000,
      });
      res.status(200).json({ message: "LOGGED IN SUCCESSFULLY" });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    }
  },

  // LOGOUT
  async logout(req: Request, res: Response) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });

    return res.status(200).json({ message: "SUCCESSFULLY LOGGED OUT" });
  },

  async me(req: Request, res: Response) {
    const token = req.cookies.accessToken;
    if (!token) {
      res.status(401).json({
        message: "User not Authorized",
      });
    }
    try {
      await authService.me(token);
    } catch (err) {
      if (err instanceof Error) {
        res.status(401).json({ message: "Not Authorized" });
      }
    }
    res.status(200).json({ message: "Authorized" });
  },
};
export default authController;
