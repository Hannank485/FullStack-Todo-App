import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: number;
}

async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  // GET TOKEN
  const ACCESS_TOKEN = process.env.ACCESS_SECRET_TOKEN;
  if (!ACCESS_TOKEN) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
  const token = req.cookies.accessToken;

  //   VERIFY IF TOKEN EXISTS
  if (!token) {
    return res.status(401).json({ message: "UNAUTHORIZED" });
  }
  try {
    // JWT VERIFY TOKEN
    const decoded = jwt.verify(token, ACCESS_TOKEN) as { id: number };
    if (!decoded.id) {
      return res.status(401).json({ message: "Unauthoried" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Session Expired Login Again" });
  }
}

export default authMiddleware;
