const fs = require("fs");
const path = require("path");
const { sendErrorMessage } = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");
const { sendResponse } = require("../helpers/sendReponse");
const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const checkRequestBody = (req, res, next) => {
  let validationArray = ["email", "password", "confirmPassword"];
  let result = validationArray.every((key) => {
    return req.body[key] && req.body[key].trim().length;
  });
  if (!result) {
    return sendErrorMessage(new AppError(406, "Invalid Body"), req, res);
  }
  next();
};

const isEmailValid = (req, res, next) => {
  if (!req.body.email.includes("@")) {
    return sendErrorMessage(new AppError(406, "Not a valid email"), req, res);
  }
  next();
};

const isEmailUnique = (req, res, next) => {
  let findUser = users.find((user) => {
    return user.email == req.body.email;
  });
  if (findUser) {
    return sendErrorMessage(
      new AppError(400, "User already Registered"),
      req,
      res
    );
  }
  next();
};

module.exports.checkRequestBody = checkRequestBody;
module.exports.isEmailValid = isEmailValid;
module.exports.isEmailUnique = isEmailUnique;
