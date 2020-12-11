const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { sendErrorMessage } = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");
const { sendResponse } = require("../helpers/sendReponse");
const { generateToken } = require("../helpers/jwtAuthentication");
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
  try {
    let result = await bcrypt.compare(
      req.body.password,
      req.currentUser.password
    );
    if (!result) {
      return sendErrorMessage(
        new AppError(400, "unsuccessful", "Password is incorrect"),
        req,
        res
      );
    }
    //generate token
    let jwtToken = await generateToken(
      { email: req.currentUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", jwtToken);
    res.status(200).json({
      status: "successfully login",
      data: [
        {
          jwt: jwtToken,
        },
      ],
    });
    // res.send("user logged in successfully");
  } catch (err) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "Password is incorrect"),
      req,
      res
    );
  }
};

module.exports.SignUpUser = SignUpUser;
module.exports.loginUser = loginUser;
