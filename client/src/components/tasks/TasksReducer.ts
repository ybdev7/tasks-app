import { ITask, TaskPriority } from "../../utils/TasksWorker";

const emptyTask = { subject: "", desc: "", priority: TaskPriority.Normal };

type Action =
  | { type: "updateTask"; task: ITask }
  | { type: "addTask" }
  | { type: "none" };

type State = {
  isOpen: boolean;
  isUpdate: boolean;
  editedTask: ITask;
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateTask":
      console.log("in reducer");
      console.log(action.task.subject);

      return { isOpen: true, isUpdate: true, editedTask: action.task };
    case "addTask":
      return { isUpdate: false, isOpen: true, editedTask: emptyTask };
    case "none":
      return { isOpen: false, isUpdate: false, editedTask: emptyTask };
  }
}
