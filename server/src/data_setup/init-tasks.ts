import { ITask, TaskPriority, Worker } from "../tasks";

//add a task
const task1: ITask = {
  subject: "ToDELETE3 not complete just one more low",
  priority: TaskPriority.Low,
  isComplete: false,
  desc: "this is a low priority task with some description",
};

const tasksWorker: Worker = new Worker();
tasksWorker.addTask(task1);
