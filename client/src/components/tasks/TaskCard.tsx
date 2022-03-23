import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  CardActionArea,
  CardHeader,
  IconButton,
  Rating,
  useTheme,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { ReactElement, useRef } from "react";
import { ITask, TaskPriority } from "../../utils/TasksWorker";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";

import { red, lightGreen, lightBlue } from "@mui/material/colors";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";

export interface ITaskHandler {
  deleteTask: (id: string) => void;
  updateTask: (inTask: ITask) => void;
  toggleIsComplete: (inTask: ITask) => void;
}
export interface ITaskCardProps extends ITaskHandler {
  task: ITask;
}
const TaskCard = ({
  task,
  deleteTask,
  updateTask,
  toggleIsComplete,
}: ITaskCardProps) => {
  const theme = useTheme();
  const taskRef = useRef<HTMLAnchorElement>(null);

  const handleCardClick = () => {
    if (taskRef && taskRef.current) {
      if (taskRef.current !== null) {
        taskRef.current.click();
      }
    }
  };

  const priorityToIcon = (
    priority?: TaskPriority | undefined
  ): ReactElement => {
    switch (priority) {
      case TaskPriority.High:
        return (
          <IconButton>
            <AssignmentLateOutlinedIcon />
          </IconButton>
        );
      case TaskPriority.Normal:
        return (
          <IconButton>
            <AssignmentTurnedInOutlinedIcon />
          </IconButton>
        );
      case TaskPriority.Low:
        return (
          <IconButton>
            <PlaylistAddCheckOutlinedIcon />
          </IconButton>
        );
      default:
        return (
          <IconButton>
            <AssignmentTurnedInOutlinedIcon />
          </IconButton>
        );
    }
  };

  const priorityToColor = (priority?: TaskPriority | undefined): string => {
    switch (priority) {
      case TaskPriority.High:
        return red[500];
      case TaskPriority.Normal:
        return lightBlue[500];
      case TaskPriority.Low:
        return lightGreen[500];
      default:
        return lightBlue[500];
    }
  };

  const handleDelete = (): void => {
    if (task._id) {
      deleteTask(task._id);
    }
  };

  return (
    <Card sx={{ minWidth: 200, maxWidth: 800 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: priorityToColor(task.priority) }}
            aria-label="task"
          >
            {priorityToIcon(task.priority)}
          </Avatar>
        }
        title={task.subject}
      />
      <CardContent>
        <Typography variant="body2">{task.desc}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => {
            toggleIsComplete(task);
          }}
        >
          {task.isComplete ? <RuleOutlinedIcon /> : <TaskOutlinedIcon />}
        </IconButton>
        <IconButton>
          <ModeEditOutlineOutlinedIcon onClick={() => updateTask(task)} />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
