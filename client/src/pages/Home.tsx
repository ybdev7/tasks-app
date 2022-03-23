import { Container, Fab, Grid, Stack } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { FC, ReactElement } from "react";
import { useQueryClient } from "react-query";
import AddIcon from "@mui/icons-material/Add";

import ScrollToTop from "../components/buttons/ScrollToTop";
import ErrorBox from "../components/errors/ErrorBox";
import LoadingBox from "../components/errors/LoadingBox";
import TasksWrapper from "../components/tasks/TasksWrapper";
import {
  ITask,
  ServerAPIsEnum,
  TaskPriority,
  TasksWorker,
  useGetTasks,
} from "../utils/TasksWorker";
import TaskForm from "../components/tasks/TaskForm";
import { reducer } from "../components/tasks/TasksReducer";

const Home: FC<{}> = (): ReactElement => {
  const { status, error, data } = useGetTasks();
  const queryClient = useQueryClient();

  const emptyTask = { subject: "", desc: "", priority: TaskPriority.Normal };

  const [{ isOpen, isUpdate, editedTask }, dispatch] = useReducer(reducer, {
    isOpen: false,
    isUpdate: false,
    editedTask: emptyTask,
  });

  useEffect(() => {
    if (data) {
      console.log("Home.useEffect - got tasks");
    }
  }, [data]);

  if (status === "loading") {
    return <LoadingBox message={"Loading tasks"} isShowProgress={true} />;
  }
  if (error instanceof Error) {
    return (
      <ErrorBox
        error={error}
        message={"Oops...we're having a problem finding your tasks"}
        isShowError={true}
      />
    );
  }

  const handleDelete = (id: string): void => {
    new TasksWorker()
      .deleteTask(id)
      .then(() => queryClient.invalidateQueries(ServerAPIsEnum.Tasks));
  };

  const handleCompleteToggle = (inTask: ITask): void => {
    new TasksWorker()
      .completeTaskToggle(inTask)
      .then(() => queryClient.invalidateQueries(ServerAPIsEnum.Tasks));
  };

  const addTaskClicked = () => {
    //go into addTask mode to open the TaskForm dialog in add new mode;
    //editedTask will be set to
    //emptyTask = {subject: "", desc: "", priority: TaskPriority.Normal};
    dispatch({ type: "addTask" });
  };

  const closeTaskForm = () => {
    //exit the addTask/updateTask mode
    dispatch({ type: "none" });
  };

  const updateTask = (inTask: ITask): void => {
    //go into updateTaskMode to open the Task form dialog in update mode
    dispatch({ type: "updateTask", task: inTask });
  };

  return (
    <>
      <Container>
        <ScrollToTop />
        <TaskForm
          key="new-task-form"
          isOpen={isOpen}
          isUpdate={isUpdate}
          editedTask={editedTask}
          closeTaskForm={closeTaskForm}
        />

        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          m={3}
        >
          <Grid item xs={4} sm={8} md={10}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              m={2}
              marginTop={10}
              spacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Fab
                onClick={addTaskClicked}
                variant="extended"
                color="primary"
                aria-label="add"
                size="large"
              >
                <AddIcon />
                Add Task
              </Fab>
            </Stack>
          </Grid>
        </Grid>

        {data && (
          <TasksWrapper
            tasks={data}
            deleteTask={handleDelete}
            updateTask={updateTask}
            toggleIsComplete={handleCompleteToggle}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
