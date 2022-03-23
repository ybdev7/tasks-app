import { Stack } from "@mui/material";
import { ITask } from "../../utils/TasksWorker";
import TaskCard, { ITaskHandler } from "./TaskCard";

interface ITasksListProps extends ITaskHandler {
  managedData: ITask[];
}

const TasksList = ({
  managedData,
  deleteTask,
  updateTask,
  toggleIsComplete,
}: ITasksListProps) => {
  return (
    <>
      <Stack direction="column" spacing={{ xs: 2, md: 3 }}>
        {managedData &&
          managedData.map((task) => (
            <TaskCard
              key={`task-${task._id}`}
              task={task}
              toggleIsComplete={toggleIsComplete}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
      </Stack>
    </>
  );
};

export default TasksList;
