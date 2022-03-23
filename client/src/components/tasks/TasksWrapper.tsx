import { useState } from "react";
import { ITask, TaskPriority } from "../../utils/TasksWorker";
import { ITaskHandler } from "./TaskCard";
import TasksFilter, { FilterType, IFilterSettings, Sort } from "./TasksFilter";
import TasksList from "./TasksList";

interface ITasksWrapperProps extends ITaskHandler {
  tasks: ITask[];
}

const TasksWrapper = ({
  tasks,
  deleteTask,
  updateTask,
  toggleIsComplete,
}: ITasksWrapperProps) => {
  const [settings, setSettings] = useState<IFilterSettings>({
    filter: FilterType.All,
    sort: Sort.SubjectAsc,
  });

  function changeFilterSettings(fs: IFilterSettings) {
    setSettings(fs);
  }

  function filterBy(a: ITask): boolean {
    switch (settings.filter) {
      case FilterType.All:
        return true;
      case FilterType.Complete:
        return a.isComplete ?? false;
      case FilterType.NotComplete:
        return !a.isComplete;
    }
  }
  function sortBy(a: ITask, b: ITask): number {
    switch (settings.sort) {
      case Sort.PriorityAsc:
        return (
          (b.priority ?? TaskPriority.Normal) -
          (a.priority ?? TaskPriority.Normal)
        );
      case Sort.PriorityDesc:
        return (
          (a.priority ?? TaskPriority.Normal) -
          (b.priority ?? TaskPriority.Normal)
        );
      case Sort.SubjectAsc:
        return a.subject.localeCompare(b.subject);
      case Sort.SubjectDesc:
        return -a.subject.localeCompare(b.subject);
      default:
        return a.subject.localeCompare(b.subject);
    }
  }

  return (
    <>
      <TasksFilter
        filter={settings.filter}
        sort={settings.sort}
        changeSettings={changeFilterSettings}
      />
      <TasksList
        managedData={tasks.filter(filterBy).sort(sortBy)}
        toggleIsComplete={toggleIsComplete}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </>
  );
};

export default TasksWrapper;
