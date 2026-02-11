import prisma from "../prismaClient";

const taskModel = {
  async initialTask(id: number) {
    const initialTask = "Welcome :D! You may add more tasks";
    await prisma.task.create({
      data: {
        task: initialTask,
        userId: id,
      },
    });
  },
  async getTask(id: number) {
    const task = await prisma.task.findMany({
      where: {
        userId: id,
      },
    });
    return task;
  },
  // CREATE TASK
  async createTask(task: string, id: number) {
    const createdTask = await prisma.task.create({
      data: {
        task: task,
        userId: id,
      },
    });
    return createdTask;
  },

  // UPDATE TASK
  async updateTask(taskId: number, userId: number, complete: boolean) {
    const result = await prisma.task.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: {
        completed: complete,
      },
    });
    return result;
  },

  // DELETE TASK
  async deleteTask(taskId: number, userId: number) {
    const result = await prisma.task.deleteMany({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    return result;
  },
  // DELETE ALL TASKS
  async deleteAllTask(userId: number) {
    const result = await prisma.task.deleteMany({
      where: {
        userId: userId,
      },
    });
    return result;
  },
};

export default taskModel;
