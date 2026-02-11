import "dotenv/config";
import express from "express";
import authRouter from "./Routes/authRoute";
import taskRouter from "./Routes/taskRoute";
import cookieParser from "cookie-parser";
import authMiddleware from "./Middleware/authMiddleware";
import authLimiter from "./Middleware/authRateLimitMiddleware";
import taskLimiter from "./Middleware/taskRateLimitMiddleware";
import cors from "cors";

if (!process.env.ACCESS_SECRET_TOKEN) {
  throw new Error("TOKENS NOT DEFINED");
}

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// ROUTERS
app.use("/api/auth", authLimiter, authRouter);
// AUTHMIDDLEWARE PROTECTS TASKS
app.use("/api/task", taskLimiter, authMiddleware, taskRouter);

app.get("/api/", (req, res) => {
  console.log("HELLO");
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT ", PORT);
});
