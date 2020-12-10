const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { sendErrorMessage } = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");
const { sendResponse } = require("../helpers/sendReponse");
const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const checkRequestBody = (req, res, next) => {
  let validationArray;
  switch (req.url) {
    case "/signup":
      validationArray = ["email", "password", "confirmPassword"];
      break;
    case "/login":
      validationArray = ["email", "password"];
      break;
    default:
      return sendErrorMessage(new AppError(400, "Error "), req, res);
  }
  let result = validationArray.every((key) => {
    return req.body[key] && req.body[key].trim().length;
  });
  if (!result) {
    return sendErrorMessage(new AppError(406, "Invalid Body"), req, res);
  }
  next();
};
//Email validation
const isEmailValid = (req, res, next) => {
  if (!req.body.email.includes("@")) {
    return sendErrorMessage(new AppError(406, "Not a valid email"), req, res);
  }
  next();
};
//Email Unique
const isEmailUnique = (req, res, next) => {
  let findUser = users.find((user) => {
    return user.email == req.body.email;
  });
  if (findUser) {
    return sendErrorMessage(
      new AppError(400, "User already registered"),
      req,
      res
    );
  }
  next();
};

const checkConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return sendErrorMessage(
      new AppError(400, "Passwords does not much"),
      req,
      res
    );
  }
  next();
};

const createPasswordHash = async (req, res, next) => {
  let salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  next();
};

module.exports.checkRequestBody = checkRequestBody;
module.exports.isEmailValid = isEmailValid;
module.exports.isEmailUnique = isEmailUnique;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.createPasswordHash = createPasswordHash;
