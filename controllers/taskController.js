const fs = require("fs");
const path = require("path");
const AppError = require("../helpers/appErrorClass");
const { sendResponse } = require("../helpers/sendReponse");
const { sendErrorMessage } = require("../helpers/sendError");
const file = path.join(__dirname, "..", "data", "task.json");
const tasks = JSON.parse(fs.readFileSync(file, "utf-8"));

const getAllTasks = (req, res, next) => {
  sendResponse(200, "Successful", tasks, req, res);
  next();
};
module.exports.getAllTasks = getAllTasks;
