// Import express
import express from "express";
import { ITask, Worker } from "./tasks";

// Create router
export const tasksRouter = express.Router();

//REST for tasks
tasksRouter.get("/", async (inRequest, inResponse) => {
  console.log("GET /tasks");
  try {
    const tasksWorker: Worker = new Worker();
    const tasks: ITask[] = await tasksWorker.listTasks();
    console.log("GET /tasks: OK. Number of tasks = ", tasks.length);
    inResponse.json(tasks);
  } catch (inError) {
    console.log("GET /tasks: Error", inError);
    inResponse.send("error");
  }
});

tasksRouter.post("/", async (inRequest, inResponse) => {
  console.log("POST /tasks", inRequest.body);
  try {
    const tasksWorker: Worker = new Worker();
    const task: ITask = await tasksWorker.addTask(inRequest.body);
    console.log("POST /tasks: OK", task);
    inResponse.json(task);
  } catch (inError) {
    console.log("POST /tasks: Error", inError);
    inResponse.send("error");
  }
});

tasksRouter.put("/", async (inRequest, inResponse) => {
  console.log("PUT /tasks", inRequest.body);
  try {
    const tasksWorker: Worker = new Worker();
    const task: ITask = await tasksWorker.updateTask(inRequest.body);
    console.log("PUT /tasks: OK", task);
    inResponse.json(task);
  } catch (inError) {
    console.log("PUT /tasks: Error", inError);
    inResponse.send("error");
  }
});

tasksRouter.delete("/:id", async (inRequest, inResponse) => {
  console.log("DELETE /tasks", inRequest.body);
  try {
    const tasksWorker: Worker = new Worker();
    await tasksWorker.deleteTask(inRequest.params.id);
    console.log("Task deleted");
    inResponse.send("ok");
  } catch (inError) {
    console.log(inError);
    inResponse.send("error");
  }
});

// Export router
module.exports = tasksRouter;
