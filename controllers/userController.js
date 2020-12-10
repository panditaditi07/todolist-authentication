const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const SignUpUser = (req, res, next) => {
  let newUser = new User(req.body.email, req.body.password);
  users.push(newUser);
  fs.writeFile(fileName, JSON.stringify(users, null, 2)=>{
    
  });
};

const loginUser = (req, res, next) => {};

module.exports.SignUpUser = SignUpUser;
module.exports.loginUser = loginUser;
