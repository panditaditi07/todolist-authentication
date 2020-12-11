const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/todoList", taskRouter);
app.listen(
  process.env.PORT,
  console.log(`Server starting at port ${process.env.PORT}`)
);
