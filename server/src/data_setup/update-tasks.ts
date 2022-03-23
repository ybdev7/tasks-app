import { ITask, TaskPriority, Worker } from "../tasks";

//update a task
const task1: ITask = {
  _id: "rpD93Q6A8pZoN5Ev",
  subject: "task2 update number 3",
  priority: TaskPriority.High,
};

const tasksWorker: Worker = new Worker();
tasksWorker.updateTask(task1);
