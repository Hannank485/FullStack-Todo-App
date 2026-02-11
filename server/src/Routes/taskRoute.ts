import express from "express";
import taskController from "../Controllers/taskController";

const router = express.Router();

router.get("/", taskController.getTask);
router.post("/", taskController.createTask);
router.delete("/all", taskController.deleteAllTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
