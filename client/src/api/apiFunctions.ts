import axios from "axios";

// BASE URL
export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
});

// TYPES

// AUTH FUNCTION
export const authFunction = {
  async apiLogin(username: string, password: string) {
    await api.post("/auth/login", { username, password });
  },

  async apiRegister(username: string, password: string) {
    await api.post("/auth/register", { username, password });
  },
  async apiLogout() {
    await api.post("/auth/logout");
  },

  async apiMe() {
    await api.get("/auth/me");
  },
};

export const taskFunction = {
  async apiFetchTask() {
    const res = await api.get("/task/");
    return res.data;
  },
  async apiCompleteTask(id: number, complete: boolean) {
    await api.put(`/task/${id}`, { complete });
  },
  async apiCreateTask(task: string) {
    const res = await api.post("/task/", { task });
    return res.data;
  },
  async apiDeleteTask(id: number) {
    await api.delete(`/task/${id}`);
  },
  async apiDeleteAllTask() {
    await api.delete("/task/all");
  },
};
