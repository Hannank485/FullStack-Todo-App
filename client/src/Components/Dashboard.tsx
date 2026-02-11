import { useEffect, useState } from "react";
import { FaTasks, FaRegTrashAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FiCoffee } from "react-icons/fi";
import { taskFunction } from "../api/apiFunctions";
type TaskType = {
  id: number;
  task: string;
  completed: boolean;
};
export default function Dashboard({ logout }: { logout: () => void }) {
  const [task, setTask] = useState<TaskType[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all",
  );
  const [taskMessage, setTaskMessage] = useState("Please add Tasks");
  const taskLength = task.length;
  const completedTaskLength = task.filter((t) => t.completed).length;
  const incompleteTaskLength = task.filter((t) => !t.completed).length;
  const width = Math.round((completedTaskLength / taskLength) * 100);
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const filteredTasks = task.filter((t) => {
    if (filter === "completed") {
      return t.completed;
    }
    if (filter === "incomplete") {
      return !t.completed;
    }
    return t;
  });
  useEffect(() => {
    async function fetchTask() {
      const data = await taskFunction.apiFetchTask();
      setTask(data);
    }
    fetchTask();
  }, []);
  const handleCreate = async (taskName: string) => {
    try {
      const value = taskName;
      setTaskName("");
      console.log(task);
      const newTask = await taskFunction.apiCreateTask(value);
      setTask((prev) => [...prev, newTask]);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };
  async function toggleComplete(id: number, value: boolean) {
    try {
      await taskFunction.apiCompleteTask(id, value);
      setTask((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: value } : t)),
      );
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteTask(id: number) {
    try {
      await taskFunction.apiDeleteTask(id);
      setTask((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }
  async function deleteAllTask() {
    try {
      await taskFunction.apiDeleteAllTask();
      setTask([]);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }
  const liClass =
    "px-5 lg:px-10 py-2 font-semibold hover:bg-gray-200 hover:text-text rounded-2xl transition-colors duration-150";

  return (
    <section className="flex flex-col gap-8 px-5 py-5 mx-auto md:py-10 md:max-w-4xl h-dvh text-text">
      {/* DASHBOARD HEADER */}
      <div className="flex items-center justify-between ">
        <div className="flex items-start gap-4 ">
          <p className="p-3 border bg-card border-border rounded-2xl">
            <FaTasks className="text-xl text-rose-600" />
          </p>
          <div>
            <h1 className="text-xl font-semibold">My Tasks</h1>
            <p className="text-sm text-subtext">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xl text-subtext">
          <p
            className="hover:text-white hover:bg-accent p-3 rounded-2xl transition-colors duration-150 cursor-pointer"
            onClick={logout}
          >
            <FiLogOut />
          </p>
        </div>
      </div>
      {/* CARD */}
      <div className="relative flex flex-col p-5 overflow-hidden rounded-4xl bg-accent hover:scale-105 transition-all duration-200">
        <div className="z-2">
          <h1 className="text-2xl font-bold leading-loose text-card">Hello!</h1>
          <p className="text-sm text-bg">
            You have {incompleteTaskLength} pending tasks today
          </p>
          <div className="flex items-center gap-4 mt-4 whitespace-nowrap text-bg">
            <div className="w-full h-2.5 bg-progress-bar rounded-xl">
              <div
                className={`  h-2.5 bg-progress-track rounded-xl transition-all duration-350 ease-in-out`}
                style={{ width: `${width ? width : 0}%` }}
              ></div>
            </div>

            <p>{width ? width : 0}% Done</p>
          </div>
        </div>
        <div className="absolute right-0 z-1 text-[190px] -top-1/6 text-card opacity-20">
          <FiCoffee />
        </div>
      </div>

      {/* INPUT FORM */}
      <form
        className="flex gap-4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate(taskName);
        }}
      >
        <input
          type="text"
          name="user"
          placeholder="What needs to be done?"
          className="p-4 duration-150 border bg-input h-13 rounded-2xl focus:outline-0 focus:border-rose-100 focus:border-4 transition-color border-border basis-[85%]"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
        <button
          className="text-card text-2xl font-bold bg-accent basis-[15%] rounded-2xl hover:bg-[#f65f78] cursor-pointer transition-colors duration-150 hover:scale-105 active:scale-90"
          type="submit"
        >
          +
        </button>
      </form>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
        {/* TASKS */}
        <div className=",mt-4 md:mt-0">
          <span className="text-2xl">Tasks</span>
          <span className="text-subtext"> ({taskLength})</span>
          {task.length > 0 && (
            <button
              className="text-xs ml-4 bg-accent hover:bg-[#f65f78] rounded-2xl p-2 text-bg"
              onClick={deleteAllTask}
            >
              Clear All Tasks
            </button>
          )}
        </div>
        <ul className="flex justify-center text-sm bg-gray-100 border border-gray-200 cursor-pointer items-center rounded-2xl text-subtext">
          <li
            className={`${liClass} ${filter === "all" ? "bg-white text-accent hover:bg-white hover:text-accent!" : ""}`}
            onClick={() => {
              setTaskMessage("Please Add Tasks");
              setFilter("all");
            }}
          >
            All
          </li>
          <li
            className={`${liClass} ${filter === "incomplete" ? "bg-white text-accent hover:bg-white hover:text-accent!" : ""}`}
            onClick={() => {
              setTaskMessage("GREAT WORK! YOU HAVE NO PENDING TASKS LEFT :D");
              setFilter("incomplete");
            }}
          >
            Incomplete
          </li>
          <li
            className={`${liClass} ${filter === "completed" ? "bg-white text-accent hover:bg-white hover:text-accent!" : ""}`}
            onClick={() => {
              setTaskMessage("Complete your tasks to see them here");
              setFilter("completed");
            }}
          >
            Completed
          </li>
        </ul>
      </div>
      {/* TASK */}

      <div className="-mt-2 max-h-96 overflow-y-auto flex-1 flex flex-col gap-2">
        {filteredTasks.length > 0 ? (
          <div>
            {filteredTasks.map((task) => {
              return (
                <TaskDisplay
                  taskData={task}
                  key={task.id}
                  deleteTask={deleteTask}
                  toggleComplete={toggleComplete}
                />
              );
            })}
          </div>
        ) : (
          <h1 className="text-5xl text-center my-auto text-subtext opacity-30 ">
            {taskMessage}
          </h1>
        )}
      </div>
    </section>
  );
}

// TASK CARD

function TaskDisplay({
  taskData,
  deleteTask,
  toggleComplete,
}: {
  taskData: TaskType;
  toggleComplete: (id: number, value: boolean) => void;
  deleteTask: (id: number) => void;
}) {
  const [loading, setLoading] = useState<boolean | null>(null);
  // MARK A FUNCTION COMPLETE
  async function markComplete(id: number, value: boolean) {
    setLoading(true);
    await toggleComplete(id, value);
    setLoading(null);
  }
  return (
    <div
      className={`${taskData.completed ? "line-through opacity-30 bg-gray-200 hover:translate-0 hover:shadow-none" : "hover:-translate-y-1 hover:shadow-md"} relative flex items-center gap-4 p-5 duration-150 bg-card border  text-text trnasition  rounded-2xl border-border group mt-2`}
    >
      <input
        type="checkbox"
        checked={taskData.completed ? true : false}
        disabled={loading === null ? false : true}
        onChange={() => {
          if (loading === null) {
            markComplete(taskData.id, !taskData.completed);
          }
        }}
        className="appearance-none w-6 h-6 rounded-lg border-2 border-accent cursor-pointer transition relative flex items-center justify-center hover:bg-accent/20 checked:hover:bg-[#f65f78]  checked:bg-accent checked:border-accent checked:before:content-['✓'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-sm checked:before:font-bold checked:before:absolute"
      />
      <p
        className="text-lg font-semibold cursor-pointer select-none "
        onClick={() => {
          markComplete(taskData.id, !taskData.completed);
        }}
      >
        {taskData.task}
      </p>
      <p
        className="absolute p-2 text-xl transition-all duration-150 md:opacity-0 right-5 text-accent hover:bg-rose-100 hover:text-rose-600 rounded-xl group-hover:opacity-100"
        onClick={() => deleteTask(taskData.id)}
      >
        <FaRegTrashAlt />
      </p>
    </div>
  );
}
