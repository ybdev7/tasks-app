import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { config } from "./config";

export enum TaskPriority {
  Low,
  Normal,
  High,
}

export interface ITask {
  _id?: string;
  subject: string;
  desc?: string;
  due?: Date;
  isComplete?: boolean;
  priority?: TaskPriority;
}

//The worker that will perform task operations
export class TasksWorker {
  /**
   * Returns a list of all tasks from the server.
   *
   * @return An array of tasks
   */
  public async listTasks(): Promise<ITask[]> {
    console.log("TasksWorker.listTasks()");

    const response: AxiosResponse = await axios.get(
      `${config.serverAddress}/tasks`
    );
    return response.data;
  } /* End listTasks() */

  /**
   * Deletes a single task
   * @param id - id of task to be deleted
   */
  public async deleteTask(id: string): Promise<void> {
    console.log(`TasksWorker.deleteTask(${id})`);
    await axios.delete(`${config.serverAddress}/tasks/${id}`);
  }

  /**
   * Adds a new task on server
   * @param inTask - new task to be added
   * @returns newly added task
   */
  public async addTask(inTask: ITask): Promise<ITask> {
    console.log(`TasksWorker.addTask(${inTask.subject})`);

    const response: AxiosResponse = await axios.post(
      `${config.serverAddress}/tasks`,
      inTask
    );
    return response.data;
  }

  /**
   *  Updates existing task
   * @param inTask update task to be sent to server
   * @returns updated task
   */
  public async updateTask(inTask: ITask): Promise<ITask> {
    console.log(`TasksWorker.updateTask(${inTask.subject})`);

    const response: AxiosResponse = await axios.put(
      `${config.serverAddress}/tasks`,
      inTask
    );
    return response.data;
  }

  /**
   * Toggles task complete or incomplete
   * @param inTask - task to toggle complete/incomplete
   * @returns updated task
   */
  public async completeTaskToggle(inTask: ITask) {
    console.log(`TasksWorker.completeTaskToggle(${inTask.subject})`);
    inTask.isComplete = !inTask.isComplete ?? true;
    return this.updateTask(inTask);
  }
}

export enum ServerAPIsEnum {
  Tasks = "tasks",
}

export const useGetTasks = () =>
  useQuery(ServerAPIsEnum.Tasks, new TasksWorker().listTasks);
