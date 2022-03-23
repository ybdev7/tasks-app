import { Worker } from "../tasks";

//delete one task using its id
const tasksWorker: Worker = new Worker();
tasksWorker.deleteTask("114GMVMJ2I5pOwDZ");
