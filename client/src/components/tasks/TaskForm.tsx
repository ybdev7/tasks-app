import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import {
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import {
  ITask,
  ServerAPIsEnum,
  TaskPriority,
  TasksWorker,
} from "../../utils/TasksWorker";

interface ITaskFormProps {
  isOpen: boolean;
  isUpdate: boolean;
  editedTask: ITask;
  closeTaskForm: () => void;
}

const TaskForm = ({
  isOpen,
  closeTaskForm,
  isUpdate,
  editedTask,
}: ITaskFormProps) => {
  const queryClient = useQueryClient();

  const [task, setTask] = useState<ITask>({ ...editedTask });

  //update task when the props change
  React.useEffect(() => {
    setTask(editedTask);
  }, [editedTask]);

  const handlePriorityChange = (event: SelectChangeEvent<TaskPriority>) => {
    setTask({
      ...task,
      priority: parseInt(event.target.value as string) as TaskPriority,
    });
  };

  const handleClose = () => {
    setTask({ subject: "", desc: "", priority: TaskPriority.Normal });

    closeTaskForm();
  };

  const mutationCreate = useMutation(new TasksWorker().addTask);
  const mutationUpdate = useMutation(new TasksWorker().updateTask);

  const handleSave = () => {
    if (!isUpdate) {
      console.log(`in hanldleSave() for addTask`);
      mutationCreate.mutate(task, {
        onSuccess: () => {
          return queryClient.invalidateQueries(ServerAPIsEnum.Tasks);
        },
      });
    } else {
      console.log(`in hanldleSave() for updateTask`);
      mutationUpdate.mutate(task, {
        onSuccess: () => {
          return queryClient.invalidateQueries(ServerAPIsEnum.Tasks);
        },
      });
    }
    handleClose();
  };

  const handleError = (isError: boolean) => {
    //tbd
    //setError(isError);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, subject: event.target.value });
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`in handleDescChange()`);
    setTask({ ...task, desc: event.target.value });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle>Edit Task {editedTask.subject}</DialogTitle>
        <DialogContent>
          {/* subject */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Recipe Title"
            required
            fullWidth
            variant="standard"
            value={task.subject}
            onChange={handleTitleChange}
          />
          {/* description */}
          <TextField
            margin="dense"
            required
            id="desc"
            label="Description"
            fullWidth
            variant="standard"
            value={task.desc}
            onChange={handleDescChange}
          />
          {/* Priority - for new task priority is set (by TaskReducer) to TaskPriority.Normal */}
          <InputLabel id="TaskForm-priority-select-label">Priority</InputLabel>
          <Select<TaskPriority>
            labelId="TaskForm-priority-controlled-open-select-label"
            id="TaskForm-priority-controlled-open-select"
            value={task.priority ?? 0}
            label="Priority"
            onChange={handlePriorityChange}
          >
            <MenuItem value={TaskPriority.High}>High</MenuItem>
            <MenuItem value={TaskPriority.Normal}>Normal</MenuItem>
            <MenuItem value={TaskPriority.Low}>Low</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskForm;
