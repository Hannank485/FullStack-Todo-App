import taskModel from "../Models/taskModel";

const taskServices = {
  async getTask(id: number) {
    const task = await taskModel.getTask(id);
    return task;
  },
  // CREATE TASK
  async createTask(task: string, id: number) {
    const createdTask = await taskModel.createTask(task, id);
    if (!createdTask) {
      throw new Error("FAILED TO CREATE TASK");
    }
    return createdTask;
  },
  //   UPDATE TASKS
  async updateTask(taskId: number, userId: number, complete: boolean) {
    const result = await taskModel.updateTask(taskId, userId, complete);
    return result;
  },
  //DELETE  TASKS

  async deleteTask(taskId: number, userId: number) {
    const result = await taskModel.deleteTask(taskId, userId);
    return result;
  },
  //DELETE ALL TASKS
  async deleteAllTask(userId: number) {
    const result = await taskModel.deleteAllTask(userId);
    return result;
  },
};

export default taskServices;
