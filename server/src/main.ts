import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";

const tasksRouter = require("./tasks_router");

const app: Express = express();
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../client/dist")));

//enable CORS
app.use(function (
  inRequest: Request,
  inResponse: Response,
  inNext: NextFunction
) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  inResponse.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  inNext();
});

//use this router for all tasks requests
app.use("/tasks", tasksRouter);

// Start app listening.
app.listen(80, () => {
  console.log("Tasks server open for requests on port 80");
});
