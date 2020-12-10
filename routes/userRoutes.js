const express = require("express");
const router = express.Router();
const { SignUpUser, loginUser } = require("../controllers/userController");

router.route("/signup").post(SignUpUser);

router.route("/login").post(loginUser);
