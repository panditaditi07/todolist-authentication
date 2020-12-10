const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const AppError = require("../helpers/appErrorClass");
const { sendErrorMessage } = require("../helpers/sendError");
const { sendResponse } = require("../helpers/sendReponse");
const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const SignUpUser = (req, res, next) => {
  let newUser = new User(req.body.email, req.body.password);
  users.push(newUser);
  fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      res.send("internal error");
      return err;
    }
  });
  res.send("added new user");
};

const loginUser = async (req, res, next) => {
  let result = await bcrypt.compare(
    req.body.password,
    req.currentUser.password
  );
  if (!result) {
    return res.send("Password is incorrect");
  }
  res.send("login successfully");
};

module.exports.SignUpUser = SignUpUser;
module.exports.loginUser = loginUser;
