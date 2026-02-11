import { Response, Request } from "express";
import taskServices from "../Services/taskServices";
interface AuthRequest extends Request {
  userId?: number;
}
const taskController = {
  async getTask(req: AuthRequest, res: Response) {
    // GET ID FOR USER
    const id = req.userId;
    if (!id) {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }
    try {
      // FETCH TASKS
      const task = await taskServices.getTask(id);
      return res.status(200).json(task);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      }
    }
  },
  //   CREATE TASKS
  async createTask(req: AuthRequest, res: Response) {
    // GET DATA FROM BODY ADN REQ
    const { task } = req.body;
    const id = req.userId;
    if (!id) {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }
    if (!task) {
      return res.status(400).json({ message: "No TASK NAME SENT" });
    }
    try {
      const createdTask = await taskServices.createTask(task, id);
      return res.status(200).json(createdTask);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "FAILED TO CREATE TASK PLEASE RETRY" });
    }
  },

  async updateTask(req: AuthRequest, res: Response) {
    // GET AND VALIDATE TASK ID
    const taskId = Number(req.params.id);
    if (!taskId) {
      return res.status(400).json({ message: "NO TASK ID PROVIDED" });
    }
    // GET USER ID
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ messsage: "UNAUTHORIZED" });
    }
    // GET Completed STATUS
    const { complete } = req.body;
    if (typeof complete !== "boolean") {
      return res.status(400).json({ message: "COMPLETE STATUS NOT PROVIDED" });
    }
    try {
      // UPDATE THE TASK
      const result = await taskServices.updateTask(taskId, userId, complete);
      //   CHECK IF UPDATED
      if (!result) {
        return res.status(500).json({ message: "AN ERROR OCCURRED" });
      }
      return res.status(200).json({ message: "SUCCESFULLY UPDATED" });
    } catch (err) {
      throw new Error("UPDATE TASK WENT WRONG");
    }
  },
  //   DELETE TASKS
  async deleteTask(req: AuthRequest, res: Response) {
    // GET AND VALIDATE TASK ID
    const taskId = Number(req.params.id);
    if (!taskId) {
      return res.status(400).json({ message: "NO TASK ID PROVIDED" });
    }
    // GET USER ID
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ messsage: "UNAUTHORIZED" });
    }
    try {
      const result = await taskServices.deleteTask(taskId, userId);
      if (result.count === 0) {
        return res.status(404).json({ message: "TASK DOES NOT EXIST" });
      }
      return res.status(200).json({ message: "TASK DELETED SUCCESFULLY" });
    } catch (err) {
      return res.status(500).json({ message: "DELETE TASK WENT WRONG" });
    }
  },

  async deleteAllTask(req: AuthRequest, res: Response) {
    // GET USER ID
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ messsage: "UNAUTHORIZED" });
    }
    try {
      const result = await taskServices.deleteAllTask(userId);
      if (result.count === 0) {
        return res.status(200).json({ message: "TASK DELETED SUCCESFULLY" });
      }
      res.status(200).json({ message: "TASK DELETED SUCCESSFULLY" });
    } catch (err) {
      return res.status(500).json({ message: "DELETE TASK WENT WRONG" });
    }
  },
};

export default taskController;
