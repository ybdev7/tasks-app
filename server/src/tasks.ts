import Nedb from "nedb";
import * as path from "path";

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

export class Worker {
  private _db: Nedb;

  constructor() {
    this._db = new Nedb({
      filename: path.join(__dirname, "tasks.db"),
      autoload: true,
    });
  }

  public listTasks(): Promise<ITask[]> {
    console.log("in Tasks.Worker.listTasks()");

    return new Promise((inResolve, inReject) => {
      this._db.find({}, (inError: Error, inDocs: ITask[]) => {
        if (inError) {
          console.log("ERROR in Tasks.Worker.listTasks(): Error", inError);
          inReject(inError);
        } else {
          //console.log("SUCCESS in Tasks.Worker.listTasks(): ", inDocs);
          console.log("SUCCESS in Tasks.Worker.listTasks() ");
          inResolve(inDocs);
        }
      });
    });
  }

  public addTask(inTask: ITask): Promise<ITask> {
    console.log("Tasks.Worker.addTask()", inTask);

    return new Promise<ITask>((inResolve, inReject) => {
      this._db.insert<ITask>(
        inTask,
        (inError: Error | null, inNewTask: ITask) => {
          if (inError) {
            console.log("ERROR in Tasks.Worker.addTask(): ", inError);
            inReject(inError);
          } else {
            console.log("SUCCESS in Tasks.Worker.addTask(): ", inNewTask);
            inResolve(inNewTask);
          }
        }
      );
    });
  }

  public updateTask(inTask: ITask): Promise<ITask> {
    console.log("Tasks.Worker.updateTask()", inTask);

    return new Promise<ITask>((inResolve, inReject) => {
      this._db.update<ITask>(
        { _id: inTask._id },
        inTask,
        { returnUpdatedDocs: true },
        (
          inError: Error | null,
          inNumUpdated: number,
          updatedDoc: any,
          isup: boolean
        ) => {
          if (inError) {
            console.log("ERROR in Tasks.Worker.updateTask(): ", inError);
            inReject(inError);
          } else {
            console.log("SUCCESS in Tasks.Worker.updateTask(): ", updatedDoc);
            inResolve(inTask);
          }
        }
      );
    });
  }

  public deleteTask(inID: string): Promise<string> {
    console.log("in Tasks.Worker.deleteTask()", inID);

    return new Promise<string>((inResolve, inReject) => {
      this._db.remove(
        { _id: inID },
        {},
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            console.log("ERROR in Tasks.Worker.deleteTask(): ", inError);
            inReject(inError);
          } else {
            console.log("SUCCESS in Tasks.Worker.deleteTask():", inNumRemoved);
            inResolve(inID);
          }
        }
      );
    });
  }
}
